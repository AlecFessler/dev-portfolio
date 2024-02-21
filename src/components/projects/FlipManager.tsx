// src/components/projects/FlipManager.tsx

import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useActor } from '@xstate/react';
import { throttle } from 'lodash';

import flipMachine from '../../state/FlipManagerMachine';
import ProjectCardConstants from '../../state/ProjectCardConstants.json'

const RESIZE_THROTTLE = 50;
const SCROLL_THROTTLE = 50;

const { TILT_INTENSITY, FLIP_DURATION, MODAL_HEIGHT, MODAL_WIDTH } = ProjectCardConstants;
const { lowered, raised } = ProjectCardConstants.TiltAnimationStates;
const { flippingToBack } = ProjectCardConstants.FlipAnimationStates;

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

const FlipManagerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
    max-width: 40rem;
    transform-style: preserve-3d;
    transform-origin: center;
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
`;

const ModalInverseScale = styled.div`
    position: absolute;
    backface-visibility: hidden;
    height: var(--modalHeight, 0px);
    width: var(--modalWidth, 0px);
    transform-origin: center;
    transform: rotateY(180deg) scaleX(var(--inverseScaleX, 1)) scaleY(var(--inverseScaleY, 1));
`;

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
    const translateY = (windowCenterY - cardCenterY) / scaleY;
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

function computeModalDimensions(windowDimensions: WindowDimensions) {
    const { width: windowWidth, height: windowHeight } = windowDimensions;
    let modalWidth, modalHeight;

    // Check if the window's aspect ratio is wider than 16:9
    if ((windowWidth / windowHeight) > (16 / 9)) {
        // Height is the limiting factor
        modalHeight = windowHeight * MODAL_HEIGHT;
        modalWidth = modalHeight * (16 / 9);
    } else {
        // Width is the limiting factor
        modalWidth = windowWidth * MODAL_WIDTH;
        modalHeight = modalWidth * (9 / 16);
    }

    return { modalWidth, modalHeight };
}

function setTransformValues(containerRef: React.RefObject<HTMLDivElement>, scaleX: number, scaleY: number, translateX: number, translateY: number) {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--scaleX', scaleX.toString());
    containerRef.current.style.setProperty('--scaleY', scaleY.toString());
    containerRef.current.style.setProperty('--translateX', translateX.toString() + 'px');
    containerRef.current.style.setProperty('--translateY', translateY.toString() + 'px');
}

function setModalProperties(containerRef: React.RefObject<HTMLDivElement>, modalWidth: number, modalHeight: number, inverseScaleX: number, inverseScaleY: number) {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--modalWidth', modalWidth.toString() + 'px');
    containerRef.current.style.setProperty('--modalHeight', modalHeight.toString() + 'px');
    containerRef.current.style.setProperty('--inverseScaleX', inverseScaleX.toString());
    containerRef.current.style.setProperty('--inverseScaleY', inverseScaleY.toString());
}

function getTransformString(rotateX: number, rotateY: number, scaleX: number, scaleY: number, translateX: number, translateY: number): string {
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scaleX(${scaleX}) scaleY(${scaleY}) translateX(${translateX}px) translateY(${translateY}px)`;
}

function computeFlipDirection(windowDimensions: WindowDimensions, cardDimensions: ElementDimensions) {
    const {centerX: windowCenterX} = windowDimensions;
    const {centerX: cardCenterX} = cardDimensions;
    return cardCenterX > windowCenterX ? 'flipLeft' : 'flipRight';
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

function getWindowDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        centerX: window.innerWidth / 2 + window.scrollX,
        centerY: window.innerHeight / 2 + window.scrollY
    };
}

const FlipManager: React.FC<FlipManagerProps> = ({ 
    ProjectCard, 
    ProjectCardProps, 
    ProjectModal, 
    ProjectModalProps 
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

    const handleResize = useCallback(
        throttle(() => {
            windowDimensionsRef.current = getWindowDimensions();
            if (currentStateRef.current === 'flipped') {
                send({ type: 'FLIP' });
            }
        }, RESIZE_THROTTLE),
    []);

    const handleScroll = useCallback(
        throttle(() => {
            if (currentStateRef.current === 'unflipped') {
                windowDimensionsRef.current = getWindowDimensions();
            } else if (currentStateRef.current === 'flipped') {
                send({ type: 'FLIP' });
            }
        }, SCROLL_THROTTLE), 
    []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        requestAnimationFrame(() => {
            if (!containerRef.current || currentStateRef.current != 'unflipped') return;
            const {scaleX, scaleY, translateX, translateY, transition} = raised;
            const {top, left} = containerRef.current.getBoundingClientRect();
            cursorPosRef.current = {x: e.clientX - left, y: e.clientY - top};
            const [rotateX, rotateY] = computeTiltAngles(cardDimensionsRef.current, cursorPosRef.current);
            containerRef.current.style.transform = getTransformString(rotateX, rotateY, scaleX, scaleY, translateX, translateY);
            containerRef.current.style.transition = transition.toString() + 's';
        });
    }, []);

    const handleMouseOut = useCallback(() => {
        requestAnimationFrame(() => {
            if (!containerRef.current || currentStateRef.current != 'unflipped') return;
            const {rotateX, rotateY, scaleX, scaleY, translateX, translateY, transition} = lowered;
            containerRef.current.style.transform = getTransformString(rotateX, rotateY, scaleX, scaleY, translateX, translateY);
            containerRef.current.style.transition = transition.toString() + 's';
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
            if (state.value === 'flippingToBack') {
                windowDimensionsRef.current = getWindowDimensions();
                cardDimensionsRef.current = getElementDimensions(containerRef);
                requestAnimationFrame(() => {
                    if (!containerRef.current) return;
                    const { zIndex } = flippingToBack;
                    containerRef.current.style.zIndex = zIndex.toString();
                    containerRef.current.classList.remove('flipLeft', 'flipRight', 'flipLeftBack', 'flipRightBack');
                    containerRef.current.classList.add(computeFlipDirection(windowDimensionsRef.current, cardDimensionsRef.current));
                    setTransformValues(containerRef, scaleX, scaleY, translateX, translateY);
                });
            } else if (state.value === 'flippingToFront') {
                windowDimensionsRef.current = getWindowDimensions();
                requestAnimationFrame(() => {
                    if (!containerRef.current) return;
                    containerRef.current.classList.remove('flipLeft', 'flipRight', 'flipLeftBack', 'flipRightBack');
                    containerRef.current.classList.add((computeFlipDirection(windowDimensionsRef.current, cardDimensionsRef.current) + 'Back'));
                    setTransformValues(containerRef, scaleX, scaleY, translateX, translateY);
                });
            } else if (state.value === 'unflipped') {
                requestAnimationFrame(() => {
                    if (!containerRef.current) return;
                    const { rotateX, rotateY, scaleX, scaleY, translateX, translateY, transition, zIndex } = lowered;
                    containerRef.current.style.transition = transition.toString() + 's';
                    containerRef.current.style.zIndex = zIndex.toString();
                    containerRef.current.classList.remove('flipLeft', 'flipRight', 'flipLeftBack', 'flipRightBack');
                    containerRef.current.style.transform = getTransformString(rotateX, rotateY, scaleX, scaleY, translateX, translateY);
                });
                cardDimensionsRef.current = getElementDimensions(containerRef);
            }
            previousStateRef.current = state.value.toString();
        });

        windowDimensionsRef.current = getWindowDimensions();
        cardDimensionsRef.current = getElementDimensions(containerRef);
        modalDimensionsRef.current = computeModalDimensions(windowDimensionsRef.current);
        const [scaleX, scaleY] = computeScalingFactors(cardDimensionsRef.current, modalDimensionsRef.current);
        setModalProperties(modalContainerRef, modalDimensionsRef.current.modalWidth, modalDimensionsRef.current.modalHeight, 1 / scaleX, 1 / scaleY);

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
        <FlipManagerContainer
            ref={containerRef}
        >
            <ProjectCard {...ProjectCardProps} flipCard={onClick} />
            <ModalInverseScale
                ref={modalContainerRef}    
            >
                <ProjectModal content={ProjectModalProps} closeModal={onClick} />
            </ModalInverseScale>
        </FlipManagerContainer>
    );
}

export default FlipManager;