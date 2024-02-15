// src/components/projects/FlipManager.tsx

import React, { useRef, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useMachine } from '@xstate/react';

import flipMachine from '../../utils/FlipManagerMachine';

const TILT_INTENSITY = 25;

const FlipManagerContainer = styled.div`
    position: relative;
    perspective: 1000px;
    width: 40rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform-style: preserve-3d;
`;

const FlipAnimations = createGlobalStyle`
  @keyframes flipLeft {
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(90deg);
    }
    100% {
        transform: rotateY(180deg);
    }
  }

  @keyframes flipRight {
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(-90deg);
    }
    100% {
        transform: rotateY(-180deg);
    }
  }

  .flipRight {
    animation: flipRight 0.6s forwards;
  }

  .flipLeft {
    animation: flipLeft 0.6s forwards;
  }
`;

interface FlipManagerProps {
    ProjectCard: React.FC<any>;
    ProjectCardProps: any;
    ProjectModal: React.FC<any>;
    ProjectModalProps: any;
}

const FlipManager: React.FC<FlipManagerProps> = ({ ProjectCard, ProjectCardProps, ProjectModal, ProjectModalProps }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [current, send] = useMachine(flipMachine);
    const [flipDimensions, setFlipDimensions] = useState({windowWidth: 0, 
                                                          windowHeight: 0, 
                                                          windowCenterX: 0, 
                                                          windowCenterY: 0, 
                                                          cardWidth: 0,
                                                          cardHeight: 0,
                                                          cardCenterX: 0, 
                                                          cardCenterY: 0});

    const computeScalingFactors = () => {
        const targetWidth = flipDimensions.windowWidth * 0.8;
        const targetHeight = flipDimensions.windowHeight * 0.8;
        const scaleX = targetWidth / flipDimensions.cardWidth;
        const scaleY = targetHeight / flipDimensions.cardHeight;
        return [scaleX, scaleY];
    };

    const computeTranslationValues = () => {
        const translateXpreScale = (flipDimensions.windowCenterX - flipDimensions.cardCenterX) * - 1; // Invert the translation for the X axis
        const translateYpreScale = flipDimensions.windowCenterY - flipDimensions.cardCenterY;

        const [scaleX, scaleY] = computeScalingFactors();

        const translateX = translateXpreScale / scaleX;
        const translateY = translateYpreScale / scaleY;

        return [translateX, translateY];
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = () => {
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            setFlipDimensions({windowWidth: window.innerWidth, 
                               windowHeight: window.innerHeight, 
                               windowCenterX: window.innerWidth / 2, 
                               windowCenterY: window.innerHeight / 2, 
                               cardWidth: width,
                               cardHeight: height,
                               cardCenterX: left + width / 2,
                               cardCenterY: top + height / 2});
        };

        const handleScroll = () => {
            if (!containerRef.current || current.matches('flippingToFront')) return;

            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            setFlipDimensions({windowWidth: window.innerWidth, 
                               windowHeight: window.innerHeight, 
                               windowCenterX: window.innerWidth / 2, 
                               windowCenterY: window.innerHeight / 2, 
                               cardWidth: width,
                               cardHeight: height,
                               cardCenterX: left + width / 2,
                               cardCenterY: top + height / 2});
        }
        
        handleResize();

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const { rotateY, transition, scaleX, scaleY, translateX, translateY } = current.context;
        containerRef.current.style.transition = `transform ${transition}`;
        containerRef.current.style.transform = `rotateY(${rotateY}deg) scaleX(${scaleX}) scaleY(${scaleY}) translateX(${translateX}px) translateY(${translateY}px)`;

        const handleMouseIn = () => {
            if (!containerRef.current || !current.matches('tiltable')) return;
            containerRef.current.style.transition = `transform 0s`;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !current.matches('tiltable')) return;

            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = e.clientX - (left + width / 2);
            const y = e.clientY - (top + height / 2);
            const rotateX = (y / height) * TILT_INTENSITY;
            const rotateY = (x / width) * TILT_INTENSITY * (y > 0 ? 1 : -1); // Invert the rotation for the lower half

            containerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseOut = () => {
            if (!containerRef.current || !current.matches('tiltable')) return;
            containerRef.current.style.transition = `transform 0.6s`;
            containerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
        };
        
        containerRef.current.addEventListener('mouseover', handleMouseIn);
        containerRef.current.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseout', handleMouseOut);

        return () => {
            containerRef.current?.removeEventListener('mouseover', handleMouseIn);
            containerRef.current?.removeEventListener('mousemove', handleMouseMove);
            containerRef.current?.removeEventListener('mouseout', handleMouseOut);
        };

    }, [current]);

    const onClick = () => {
        if (!containerRef.current) return;
        const [scaleX, scaleY] = computeScalingFactors();
        const [translateX, translateY] = computeTranslationValues();
        if (current.matches('tiltable')) {
            send({type: 'FLIP_TO_BACK', scaleX, scaleY, translateX, translateY });
            if (flipDimensions.cardCenterX > flipDimensions.windowCenterX) {
                containerRef.current.classList.add('flipRight');
                containerRef.current.classList.remove('flipLeft');
            } else {
                containerRef.current.classList.add('flipLeft');
                containerRef.current.classList.remove('flipRight');
            }
            containerRef.current.style.transition = `transform 1s`;
            containerRef.current.style.transform = `scaleX(${scaleX}) scaleY(${scaleY}) translateX(${translateX}px) translateY(${translateY}px)`;
            containerRef.current.style.zIndex = '1000';
        } else if (current.matches('flipped')) {
            send({type: 'FLIP_TO_FRONT', scaleX, scaleY, translateX, translateY });
            containerRef.current.style.transition = `transform 1s`;
            containerRef.current.style.transform = `scaleX(${scaleX}) scaleY(${scaleY}) translateX(${translateX}px) translateY(${translateY}px)`;
            containerRef.current.style.zIndex = '0';
        }
    };

    return (
        <FlipManagerContainer
            ref={containerRef}
            onClick={onClick}
        >
            <ProjectCard {...ProjectCardProps} />
            <ProjectModal />
        </FlipManagerContainer>
    );
};

export default FlipManager;