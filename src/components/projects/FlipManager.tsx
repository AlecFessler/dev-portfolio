// src/components/projects/FlipManager.tsx

import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useActor } from '@xstate/react';

import flipMachine from '../../state/FlipManagerMachine';

const TILT_INTENSITY = 25;
const FLIP_DURATION = 1.0;
const MODAL_HEIGHT = 0.8; // 80% of the window height
const MODAL_WIDTH = 0.8; // 80% of the window width

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

interface FlipEvent {
    type: 'FLIP';
    scaleX: number;
    scaleY: number;
    translateX: number;
    translateY: number;
}

// Container for the flip animation
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

/**
 * Compute the scaling factors for the modal based on the window and card dimensions.
 * 
 * @param windowDimensions - the dimensions of the window
 * @param cardDimensions - the dimensions of the card
 * @returns the scaling factors for the modal
 */
function computeScalingFactors(windowDimensions: WindowDimensions, cardDimensions: ElementDimensions) {
    const {width: windowWidth, height: windowHeight} = windowDimensions;
    const {width: cardWidth, height: cardHeight} = cardDimensions;
    const targetWidth = windowWidth * MODAL_WIDTH;
    const targetHeight = windowHeight * MODAL_HEIGHT;
    const scaleX = targetWidth / cardWidth;
    const scaleY = targetHeight / cardHeight;
    return [scaleX, scaleY];
}

/**
 * Compute the translation values for the modal based on the window and card dimensions.
 * 
 * @param windowDimensions - the dimensions of the window
 * @param cardDimensions - the dimensions of the card
 * @returns the translation values for the modal
 */
function computeTranslationValues(windowDimensions: WindowDimensions, cardDimensions: ElementDimensions) {
    const {centerX: windowCenterX, centerY: windowCenterY} = windowDimensions;
    const {relativeCenterX: cardCenterX, relativeCenterY: cardCenterY} = cardDimensions;
    const [scaleX, scaleY] = computeScalingFactors(windowDimensions, cardDimensions);
    const translateX = ((windowCenterX - cardCenterX) / scaleX) * -1; // invert the X translation to account for 180 degree Y rotation
    const translateY = windowCenterY - cardCenterY;
    return [translateX, translateY];
}

/**
 * Compute the tilt angles for the card based on the card dimensions and cursor position.
 * 
 * @param elementDimensions - the dimensions of the card
 * @param cursorPos - the position of the cursor
 * @returns the tilt angles for the card
 */
function computeTiltAngles(elementDimensions: ElementDimensions, cursorPos: {x: number, y: number}) {
    const {width, height, centerX, centerY} = elementDimensions;
    const x = cursorPos.x - centerX;
    const y = cursorPos.y - centerY;
    const rotateX = (y / height) * TILT_INTENSITY;
    const rotateY = (x / width) * TILT_INTENSITY * (y > 0 ? 1 : -1); // Invert the rotation for the lower half
    return [rotateX, rotateY];
}

function computeModalProperties(windowDimensions: WindowDimensions, [scaleX, scaleY]: [number, number]) {
    const modalWidth = Math.floor(windowDimensions.width * MODAL_WIDTH);
    const modalHeight = Math.floor(windowDimensions.height * MODAL_HEIGHT);
    const inverseScaleX = 1 / scaleX;
    const inverseScaleY = 1 / scaleY;
    return {modalHeight, modalWidth, inverseScaleX, inverseScaleY};
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

/**
 * returns the transform string for the card based on the context of the state machine
 * 
 * @param rotateX - the x-axis rotation angle
 * @param rotateY - the y-axis rotation angle
 * @param scaleX - the x-axis scaling factor
 * @param scaleY - the y-axis scaling factor
 * @param translateX - the x-axis translation value
 * @param translateY - the y-axis translation value
 */
function getTransformString(rotateX: number, rotateY: number, scaleX: number, scaleY: number, translateX: number, translateY: number): string {
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scaleX(${scaleX}) scaleY(${scaleY}) translateX(${translateX}px) translateY(${translateY}px)`;
}

/**
 * Compute the flip direction based on the window and card dimensions.
 * 
 * @param windowDimensions - the dimensions of the window
 * @param cardDimensions - the dimensions of the card
 * @returns the flip direction
 */
function computeFlipDirection(windowDimensions: WindowDimensions, cardDimensions: ElementDimensions) {
    const {centerX: windowCenterX} = windowDimensions;
    const {centerX: cardCenterX} = cardDimensions;
    return cardCenterX > windowCenterX ? 'flipLeft' : 'flipRight';
}

/**
 * Get the dimensions of an element.
 * 
 * @param containerRef - reference to the element
 * @returns the dimensions of the element
 */
function getElementDimensions(containerRef: React.RefObject<HTMLDivElement>) {
    if (!containerRef.current) return {left: 0, top: 0, width: 0, height: 0, centerX: 0, centerY: 0, relativeCenterX: 0, relativeCenterY: 0};
    const {left, top, width, height} = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const relativeCenterX = centerX + window.scrollX;
    const relativeCenterY = centerY + window.scrollY;
    return {width, height, centerX, centerY, relativeCenterX, relativeCenterY};
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
    const cursorPosRef = useRef({x: 0, y: 0});

    const [state, send, service] = useActor(flipMachine);

    const handleWindow = useCallback(() => {
        if (!containerRef.current) return;
        windowDimensionsRef.current = {
            width: window.innerWidth, 
            height: window.innerHeight, 
            centerX: window.innerWidth / 2 + window.scrollX,
            centerY: window.innerHeight / 2 + window.scrollY
        };
        cardDimensionsRef.current = getElementDimensions(containerRef);
        const [scaleX, scaleY] = computeScalingFactors(windowDimensionsRef.current, cardDimensionsRef.current);
        const [translateX, translateY] = computeTranslationValues(windowDimensionsRef.current, cardDimensionsRef.current);
        // keep the modals height, width, and inverse scaling in sync with the window and cards position and dimensions
        const { modalWidth, modalHeight, inverseScaleX, inverseScaleY } = computeModalProperties(
            windowDimensionsRef.current,
            [scaleX, scaleY],
        );
        setModalProperties(modalContainerRef, modalWidth, modalHeight, inverseScaleX, inverseScaleY);
        if (currentStateRef.current == 'unflipped') return;
        containerRef.current.classList.remove('flipLeft', 'flipRight', 'flipLeftBack', 'flipRightBack');
        containerRef.current.style.transition = '0s'; // set to 0 for responsive update
        containerRef.current.style.transform = getTransformString(0, 180, scaleX, scaleY, translateX, translateY);
    }, []);

    /**
     * Apply the tilt animation to the card when the cursor moves over.
     */
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current || currentStateRef.current != 'unflipped') return;
        cursorPosRef.current = {x: e.clientX, y: e.clientY};
        const [rotateX, rotateY] = computeTiltAngles(cardDimensionsRef.current, cursorPosRef.current);
        containerRef.current.style.transform = getTransformString(rotateX, rotateY, 1, 1, 0, 0);
        containerRef.current.style.transition = '0s';
    }, []);

    /**
     * Apply the set down animation to the card when the cursor moves out.
     */
    const handleMouseOut = useCallback(() => {
        if (!containerRef.current || currentStateRef.current != 'unflipped') return;
        containerRef.current.style.transform = getTransformString(0, 0, 1, 1, 0, 0);
        containerRef.current.style.transition = '0.6s';
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        // Respond to changes in the state machine without causing a rerender
        service.subscribe((state) => {
            // confirm previous state is different to prevent flips while flipping
            if (!containerRef.current || previousStateRef.current === state.value) return;
            currentStateRef.current = state.value.toString();
            if (state.value === 'flippingToBack') {
                containerRef.current.style.zIndex = '1'; // raise the card above others for flip
                containerRef.current.classList.remove('flipLeft', 'flipRight', 'flipLeftBack', 'flipRightBack');
                containerRef.current.classList.add(computeFlipDirection(windowDimensionsRef.current, cardDimensionsRef.current));
                const [scaleX, scaleY] = computeScalingFactors(windowDimensionsRef.current, cardDimensionsRef.current);
                const [translateX, translateY] = computeTranslationValues(windowDimensionsRef.current, cardDimensionsRef.current);
                setTransformValues(containerRef, scaleX, scaleY, translateX, translateY);
            } else if (state.value === 'flippingToFront') {
                containerRef.current.classList.remove('flipLeft', 'flipRight', 'flipLeftBack', 'flipRightBack');
                containerRef.current.classList.add((computeFlipDirection(windowDimensionsRef.current, cardDimensionsRef.current) + 'Back'));
                const [scaleX, scaleY] = computeScalingFactors(windowDimensionsRef.current, cardDimensionsRef.current);
                const [translateX, translateY] = computeTranslationValues(windowDimensionsRef.current, cardDimensionsRef.current);
                setTransformValues(containerRef, scaleX, scaleY, translateX, translateY);
            } else if (state.value === 'unflipped') {
                containerRef.current.classList.remove('flipLeft', 'flipRight', 'flipLeftBack', 'flipRightBack');
                containerRef.current.style.transform = getTransformString(0, 0, 1, 1, 0, 0); // reset transform after flip
                containerRef.current.style.transition = '0.6s'; // reset transition after flip
                containerRef.current.style.zIndex = '0'; // reset z-index after flip
            }
            previousStateRef.current = state.value.toString();
        });

        handleWindow(); // Initialize the window and card dimensions

        // Handle reposition and resize of modal on resize and scroll
        window.addEventListener('resize', handleWindow);
        window.addEventListener('scroll', handleWindow);

        // Handle tilt effect on mouse move
        containerRef.current.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseout', handleMouseOut);

        return () => {
            service.stop();
            window.removeEventListener('resize', handleWindow);
            window.removeEventListener('scroll', handleWindow);
            containerRef.current?.removeEventListener('mousemove', handleMouseMove);
            containerRef.current?.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    const onClick = useCallback(() => {
        const [scaleX, scaleY] = computeScalingFactors(windowDimensionsRef.current, cardDimensionsRef.current);
        const [translateX, translateY] = computeTranslationValues(windowDimensionsRef.current, cardDimensionsRef.current);
        const flipEvent: FlipEvent = {type: 'FLIP', scaleX, scaleY, translateX, translateY};
        send(flipEvent);
    }, []);

    return (
        <FlipManagerContainer
            ref={containerRef}
            onClick={onClick}
        >
            <ProjectCard {...ProjectCardProps} />
            <ModalInverseScale
                ref={modalContainerRef}    
            >
                <ProjectModal />
            </ModalInverseScale>
        </FlipManagerContainer>
    );
}

export default FlipManager;