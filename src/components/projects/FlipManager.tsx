// src/components/projects/FlipManager.tsx

import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { StateFrom } from 'xstate';
import { useActor } from '@xstate/react';

import flipMachine from '../../state/FlipManagerMachine';

const TILT_INTENSITY = 25;
const FLIP_DURATION = 1.0;
const MODAL_HEIGHT = 0.8; // 80% of the window height
const MODAL_WIDTH = 0.8; // 80% of the window width

enum CardStates {
    UNFLIPPED = 'unflipped',
    FLIPPED = 'flipped',
}
const { UNFLIPPED, FLIPPED } = CardStates;

interface FlipManagerProps {
    ProjectCard: React.FC<any>;
    ProjectCardProps: any;
    ProjectModal: React.FC<any>;
    ProjectModalProps: any;
}

interface FlipManagerContext {
    rotateX: number;
    rotateY: number;
    scaleX: number;
    scaleY: number;
    translateX: number;
    translateY: number;
    transition: number;
    zIndex: number;
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
}

interface FlipEvent {
    type: 'FLIP';
    scaleX: number;
    scaleY: number;
    translateX: number;
    translateY: number;
}

interface AnimationStyles {
    transform: string;
    transition: string;
    zIndex: number;
}

// Container for the flip animation
const FlipManagerContainer = styled.div`
    position: relative;
    perspective: 1000px;
    width: 40rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform-style: preserve-3d;
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

/**
 * Get the transform, transition, and zIndex styles strings for the card based on the context.
 * 
 * @param context - the context object containing the animation properties
 * @returns transform, transition, and zIndex styles for the card
 */
function getAnimationStyles(context: FlipManagerContext) {
    const { 
        rotateX, 
        rotateY, 
        scaleX, 
        scaleY, 
        translateX, 
        translateY,
        transition,
        zIndex
    } = context;
    return {
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scaleX(${scaleX}) scaleY(${scaleY}) translateX(${translateX}px) translateY(${translateY}px)`,
        transition: `${transition}s`,
        zIndex
    };
}

/**
 * Apply the transform, transition, and zIndex styles to the card.
 * 
 * @param containerRef - reference to the card container
 * @param animationStyles - transform, transition, and zIndex styles for the card
 */
function applyAnimationStyles(containerRef: React.RefObject<HTMLDivElement>, animationStyles: AnimationStyles) {
    if (!containerRef.current) return;
    const {transform, transition, zIndex} = animationStyles;
    containerRef.current.style.transition = transition;
    containerRef.current.style.transform = transform;
    containerRef.current.style.zIndex = zIndex.toString();
}

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
    const {width: windowWidth, height: windowHeight, centerX: windowCenterX, centerY: windowCenterY} = windowDimensions;
    const {width: cardWidth, height: cardHeight, centerX: cardCenterX, centerY: cardCenterY} = cardDimensions;

    return [0, 0];
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
    if (!containerRef.current) return {left: 0, top: 0, width: 0, height: 0, centerX: 0, centerY: 0};
    const {left, top, width, height} = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    return {width, height, centerX, centerY};
}

const FlipManager: React.FC<FlipManagerProps> = ({ 
    ProjectCard, 
    ProjectCardProps, 
    ProjectModal, 
    ProjectModalProps 
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousStateRef = useRef<StateFrom<typeof flipMachine> | null>(null);
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
        centerY: 0
    });
    const cursorPosRef = useRef({x: 0, y: 0});

    //console.log("Rendered");

    const [state, send, service] = useActor(flipMachine);

    /**
     * Recompute the modal scale and translate values when the window is resized or scrolled
     * to keep it centered and sized correctly.
     */
    const handleWindow = useCallback(() => {
        windowDimensionsRef.current = {
            width: window.innerWidth, 
            height: window.innerHeight, 
            centerX: window.innerWidth / 2,
            centerY: window.scrollY + window.innerHeight / 2
        };
        cardDimensionsRef.current = getElementDimensions(containerRef);
        if (state.value === UNFLIPPED) return;
        const [scaleX, scaleY] = computeScalingFactors(windowDimensionsRef.current, cardDimensionsRef.current);
        const [translateX, translateY] = computeTranslationValues(windowDimensionsRef.current, cardDimensionsRef.current);
        applyAnimationStyles(containerRef, getAnimationStyles({...state.context, scaleX, scaleY, translateX, translateY}));
    }, []);

    /**
     * Update the tilt effect when the mouse moves within the card.
     */
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (state.value !== UNFLIPPED) return;
        cursorPosRef.current = {x: e.clientX, y: e.clientY};
        const [rotateX, rotateY] = computeTiltAngles(cardDimensionsRef.current, cursorPosRef.current);
        state.context = {...state.context, transition: 0, rotateX, rotateY};
        applyAnimationStyles(containerRef, getAnimationStyles(state.context));
    }, []);

    /**
     * Reset the tilt effect when the mouse leaves the card.
     */
    const handleMouseOut = useCallback(() => {
        if (state.value !== UNFLIPPED) return;
        state.context = {...state.context, transition: 0.6, rotateX: 0, rotateY: 0};
        applyAnimationStyles(containerRef, getAnimationStyles(state.context));
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        // Respond to changes in the state machine without causing a rerender
        service.subscribe((state) => {
            if (!containerRef.current || previousStateRef.current?.value === state.value) return;
            if (state.value === 'flippingToBack') {
                containerRef.current.classList.remove('flipLeft', 'flipRight', 'flipLeftBack', 'flipRightBack');
                containerRef.current.classList.add(computeFlipDirection(windowDimensionsRef.current, cardDimensionsRef.current));
            } else if (state.value === 'flippingToFront') {
                containerRef.current.classList.remove('flipLeft', 'flipRight', 'flipLeftBack', 'flipRightBack');
                containerRef.current.classList.add((computeFlipDirection(windowDimensionsRef.current, cardDimensionsRef.current) + 'Back'));
            } else {
                console.log("finished flipping");
            }
            previousStateRef.current = state;
        });

        // Handle reposition and resize of modal on resize and scroll
        window.addEventListener('resize', handleWindow);
        window.addEventListener('scroll', handleWindow);

        // Handle tilt effect on mouse move
        //containerRef.current.addEventListener('mousemove', handleMouseMove);
        //containerRef.current.addEventListener('mouseout', handleMouseOut);

        return () => {
            service.stop();
            window.removeEventListener('resize', handleWindow);
            window.removeEventListener('scroll', handleWindow);
            //containerRef.current?.removeEventListener('mousemove', handleMouseMove);
            //containerRef.current?.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    /**
     * Handle the click event to flip the card. The click event is only valid when the
     * card is in the unflipped or flipped state. The flip event is sent to the state
     * machine to trigger the flip transition. The flip direction is computed based on
     * the position of the card relative to the center of the window. The flip styles
     * are applied to the container to trigger the rotation part of the flip animation.
     * The scaling and translation are handled in the callback passed to useStateMachine.
     * It's done this way because keyframes are necessary to control the direction of the
     * rotation, and keyframes cannot be applied via direct DOM manipulation, thus we must
     * dynamically add and remove classes to trigger the keyframes.
     */
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
            <ProjectModal />
        </FlipManagerContainer>
    );
}

export default FlipManager;