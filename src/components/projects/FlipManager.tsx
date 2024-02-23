// src/components/projects/FlipManager.tsx

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useActor } from '@xstate/react';

import ModalBackgroundShader from './ModalBackgroundShader';
import flipMachine from '../../state/FlipManagerMachine';
import ProjectCardConstants from '../../state/ProjectCardConstants.json'

const { TILT_INTENSITY, FLIP_DURATION } = ProjectCardConstants;
const { lowered, raised } = ProjectCardConstants.TiltAnimationStates;
const { flippingToBack, flippingToFront } = ProjectCardConstants.FlipAnimationStates;

interface FlipManagerProps {
    ProjectCard: React.FC<any>;
    ProjectCardProps: any;
    ProjectModal: React.FC<any>;
    ProjectModalProps: any;
}

interface WindowDimensions {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
}

interface ElementDimensions {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    relativeCenterX: number;
    relativeCenterY: number;
}

const FlipManagerContainer = styled.div<{ $side: 'left' | 'right' }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
    transform-style: preserve-3d;
    transition: var(--transition, 0);
    transform: var(--transform, none);
    z-index: var(--zIndex, 0);
    &.flipLeft {
        animation: flipLeft ${FLIP_DURATION}s forwards;
    }
    &.flipRight {
        animation: flipRight ${FLIP_DURATION}s forwards;
    }
    &.flipLeftBack {
        animation: flipLeftBack ${FLIP_DURATION}s forwards;
    }
    &.flipRightBack {
        animation: flipRightBack ${FLIP_DURATION}s forwards;
    }
    
    @media (min-widt: 768px) {
        justify-content: ${({ $side }) => $side === 'left' ? 'flex-end' : 'flex-start'};
    }
`;

const ModalInverseScale = styled.div`
    position: absolute;
    backface-visibility: hidden;
    padding: 43.2px 43.2px 0 43.2px;
    transform: rotateY(180deg) scaleX(var(--inverseScaleX, 1)) scaleY(var(--inverseScaleY, 1));
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
    @media (max-width: 600px) {
        padding: 0;
    }
    @media (min-width: 601px) {
    }
    @media (min-width: 768px) {
    }
    @media (min-width: 1024px) {
    }
    @media (min-width: 1440px) {
    }
    @media (min-width: 2560px) {
    }
`;

function headerHeight() {
    const header = document.querySelector('header');
    return header ? header.clientHeight : 0;
}

function computeScalingFactors(
    cardDimensions: ElementDimensions, 
    modalDimensions: {modalWidth: number, modalHeight: number}) {
    const {width: cardWidth, height: cardHeight} = cardDimensions;
    const {modalWidth, modalHeight} = modalDimensions;
    const scaleX = modalWidth / cardWidth;
    const scaleY = modalHeight / cardHeight;
    return [scaleX, scaleY];
}

function computeTranslationValues(windowDimensions: WindowDimensions, 
                                  cardDimensions: ElementDimensions, 
                                  modalDimensions: {modalWidth: number, modalHeight: number}) {
    const {centerX: windowCenterX, centerY: windowCenterY} = windowDimensions;
    const {relativeCenterX: cardCenterX, relativeCenterY: cardCenterY} = cardDimensions;
    const [scaleX, scaleY] = computeScalingFactors(cardDimensions, modalDimensions);
    const translateX = ((windowCenterX - cardCenterX) / scaleX) * -1; // invert the X translation to account for 180 degree Y rotation
    const translateY = ((windowCenterY - cardCenterY) / scaleY) + headerHeight() / 2;
    return [translateX, translateY];
}

function computeTiltAngles(elementDimensions: ElementDimensions, cursorPos: {x: number, y: number}) {
    const {width, height, centerX, centerY} = elementDimensions;
    const x = cursorPos.x - centerX;
    const y = cursorPos.y - centerY;
    const rotateX = (y / height) * TILT_INTENSITY;
    const rotateY = (x / width) * TILT_INTENSITY * (y > 0 ? 1 : -1); // Invert the rotation for the lower half
    return [rotateX, rotateY];
}

function setContainerStyleVars(containerRef: React.RefObject<HTMLDivElement>, transition: number, zIndex: number, transform: string) {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--transition', transition.toString() + 's');
    containerRef.current.style.setProperty('--zIndex', zIndex.toString());
    containerRef.current.style.setProperty('--transform', transform);
}

function setFlipAnimationTransformVars(containerRef: React.RefObject<HTMLDivElement>, scaleX: number | null, scaleY: number | null, translateX: number | string | null, translateY: number | string | null) {
    if (!containerRef.current) return;
    if (scaleX !== null) containerRef.current.style.setProperty('--scaleX', scaleX.toString());
    if (scaleY !== null) containerRef.current.style.setProperty('--scaleY', scaleY.toString());
    if (translateX !== null) containerRef.current.style.setProperty('--translateX', translateX.toString() + (typeof translateX === 'string' ? '' : 'px'));
    if (translateY !== null) containerRef.current.style.setProperty('--translateY', translateY.toString() + (typeof translateY === 'string' ? '' : 'px'));
}

function setModalScale(containerRef: React.RefObject<HTMLDivElement>, inverseScaleX: number, inverseScaleY: number) {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--inverseScaleX', inverseScaleX.toString());
    containerRef.current.style.setProperty('--inverseScaleY', inverseScaleY.toString());
}

function getTransformString(rotateX: number, rotateY: number, scaleX: number, scaleY: number, translateX: number, translateY: number | string): string {
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scaleX(${scaleX}) scaleY(${scaleY}) translateX(${translateX}) translateY(${translateY}${translateY.toString().includes('%') ? '' : 'px'})`;
}

function computeScreenSide(windowDimensions: WindowDimensions, cardDimensions: ElementDimensions) {
    const {centerX: windowCenterX} = windowDimensions;
    const {relativeCenterX: cardCenterX} = cardDimensions;
    return cardCenterX < windowCenterX ? 'left' : 'right';
}

function getWindowDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        centerX: window.innerWidth / 2 + window.scrollX,
        centerY: window.innerHeight / 2 + window.scrollY
    };
}

function getElementDimensions(containerRef: React.RefObject<HTMLDivElement>) {
    if (!containerRef.current) return {left: 0, top: 0, width: 0, height: 0, centerX: 0, centerY: 0, relativeCenterX: 0, relativeCenterY: 0};
    const {top, left, width, height} = containerRef.current.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;
    const relativeCenterX = left + centerX + window.scrollX;
    const relativeCenterY = top + centerY + window.scrollY;
    return {width, height, centerX, centerY, relativeCenterX, relativeCenterY};
}

function getModalDimensions(modalContainerRef: React.RefObject<HTMLDivElement>) {
    if (!modalContainerRef.current) return {modalWidth: 0, modalHeight: 0};
    return {modalWidth: modalContainerRef.current.offsetWidth, modalHeight: modalContainerRef.current.offsetHeight};
}

const FlipManager: React.FC<FlipManagerProps> = ({ 
    ProjectCard, 
    ProjectCardProps, 
    ProjectModal, 
    ProjectModalProps,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const modalContainerRef = useRef<HTMLDivElement>(null);
    const currentStateRef = useRef<string>('unflipped');
    const previousStateRef = useRef<string>('unflipped');
    const windowDimensionsRef = useRef({
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0
    });
    const cardDimensionsRef = useRef<ElementDimensions>({
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,
        relativeCenterX: 0,
        relativeCenterY: 0
    });
    const modalDimensionsRef = useRef({modalWidth: 0, modalHeight: 0});
    const cursorPosRef = useRef({x: 0, y: 0});
    const [state, send, service] = useActor(flipMachine);
    const [animationClass, setAnimationClass] = useState('' as string);
    const [screenSide, setScreenSide] = useState('left' as 'left' | 'right');

    const handleResize = useCallback(() => {
        windowDimensionsRef.current = getWindowDimensions();
        modalDimensionsRef.current = getModalDimensions(modalContainerRef);
    }, []);

    const handleScroll = useCallback(() => {
        requestAnimationFrame(() => {
            windowDimensionsRef.current = getWindowDimensions();
            if (currentStateRef.current !== 'flippingToBack' && currentStateRef.current != 'flipped') return;
            const [translateX, translateY] = computeTranslationValues(windowDimensionsRef.current, cardDimensionsRef.current, modalDimensionsRef.current);
            setFlipAnimationTransformVars(containerRef, null, null, null, translateY);
        });
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        requestAnimationFrame(() => {
            if (!containerRef.current || currentStateRef.current != 'unflipped') return;
            const {scaleX, scaleY, translateX, translateY, transition} = raised;
            const {top, left} = containerRef.current.getBoundingClientRect();
            cursorPosRef.current = {x: e.clientX - left, y: e.clientY - top};
            const [rotateX, rotateY] = computeTiltAngles(cardDimensionsRef.current, cursorPosRef.current);
            setContainerStyleVars(containerRef, transition, 0, getTransformString(rotateX, rotateY, scaleX, scaleY, translateX, translateY));
        });
    }, []);

    const handleMouseOut = useCallback(() => {
        requestAnimationFrame(() => {
            if (!containerRef.current || currentStateRef.current != 'unflipped') return;
            const {rotateX, rotateY, scaleX, scaleY, translateX, translateY, transition} = lowered;
            setContainerStyleVars(containerRef, transition, 0, getTransformString(rotateX, rotateY, scaleX, scaleY, translateX, translateY));
        });
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        service.subscribe((state) => {
            if (!containerRef.current || previousStateRef.current === state.value) return;
            currentStateRef.current = state.value.toString();
            const [scaleX, scaleY] = computeScalingFactors(cardDimensionsRef.current, modalDimensionsRef.current);
            const [translateX, translateY] = computeTranslationValues(windowDimensionsRef.current, 
                                                                      cardDimensionsRef.current,
                                                                      modalDimensionsRef.current);
            const flipDirection = screenSide === 'left' ? 'Left' : 'Right';
            const animationClass = `flip${flipDirection}`;
            if (state.value === 'flippingToBack') {
                windowDimensionsRef.current = getWindowDimensions();
                cardDimensionsRef.current = getElementDimensions(containerRef);
                requestAnimationFrame(() => {
                    if (!containerRef.current) return;
                    const { zIndex } = flippingToBack;
                    setContainerStyleVars(containerRef, 0, zIndex, '');
                    setFlipAnimationTransformVars(containerRef, scaleX, scaleY, translateX, translateY);
                    setAnimationClass(animationClass);
                });
            } else if (state.value === 'flippingToFront') {
                windowDimensionsRef.current = getWindowDimensions();
                requestAnimationFrame(() => {
                    if (!containerRef.current) return;
                    const { zIndex } = flippingToFront;
                    setContainerStyleVars(containerRef, 0, zIndex, '');
                    setFlipAnimationTransformVars(containerRef, scaleX, scaleY, translateX, translateY);
                    setAnimationClass(animationClass + 'Back');
                });
            } else if (state.value === 'unflipped') {
                requestAnimationFrame(() => {
                    if (!containerRef.current) return;
                    const { transition, zIndex } = lowered;
                    setContainerStyleVars(containerRef, transition, zIndex, '');
                    setAnimationClass('');
                });
                cardDimensionsRef.current = getElementDimensions(containerRef);
            }
            previousStateRef.current = state.value.toString();
        });

        windowDimensionsRef.current = getWindowDimensions();
        cardDimensionsRef.current = getElementDimensions(containerRef);
        modalDimensionsRef.current = getModalDimensions(modalContainerRef);
        const [scaleX, scaleY] = computeScalingFactors(cardDimensionsRef.current, modalDimensionsRef.current);
        setModalScale(modalContainerRef, 1 / scaleX, 1 / scaleY);
        setScreenSide(computeScreenSide(windowDimensionsRef.current, cardDimensionsRef.current));

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        containerRef.current.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseout', handleMouseOut);

        return () => {
            service.stop();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            containerRef.current?.removeEventListener('mousemove', handleMouseMove);
            containerRef.current?.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    const onClick = useCallback(() => {
        send({ type: 'FLIP' });
    }, []);

    return (
        <>
        <FlipManagerContainer
            ref={containerRef}
            className={animationClass}
            $side={screenSide}
        >
            <ProjectCard {...ProjectCardProps} flipCard={onClick} />
            <ModalInverseScale
                ref={modalContainerRef}    
            >
                <ProjectModal content={ProjectModalProps} closeModal={onClick} />
            </ModalInverseScale>
        </FlipManagerContainer>
        <ModalBackgroundShader visible={() => {
            // this works because the component rerenders on the flip animation due to setting the
            // animation class, thus the lambda passed to this function gets a new reference to the
            // state value to cause a rerender of the background shader with the correct class
            if (state.value === 'unflipped') { return '' }
            else if (state.value === 'flippingToFront') { return 'animateOpacityOut' }
            else { return 'animateOpacity' }
        }} />
        </>
    );
}

export default FlipManager;