// src/styles/flipAnimations.ts

import { createGlobalStyle } from 'styled-components';

const FlipAnimations = createGlobalStyle`
@keyframes flipRight {
    0% {
        transform: rotateY(0deg) scaleX(1) scaleY(1) translateX(0) translateY(0)
    }
    50% {
        transform: rotateY(90deg)
    }
    100% {
        transform: rotateY(180deg) scaleX(var(--scaleX, 1)) scaleY(var(--scaleY, 1)) translateX(var(--translateX, 0)) translateY(var(--translateY, 0))
    }
}

@keyframes flipLeft {
    0% {
        transform: rotateY(0deg) scaleX(1) scaleY(1) translateX(0) translateY(0)
    }
    50% {
        transform: rotateY(-90deg)
    }
    100% {
        transform: rotateY(-180deg) scaleX(var(--scaleX, 1)) scaleY(var(--scaleY, 1)) translateX(var(--translateX, 0)) translateY(var(--translateY, 0))
    }
}

@keyframes flipRightBack {
    0% {
        transform: rotateY(180deg) scaleX(var(--scaleX, 1)) scaleY(var(--scaleY, 1)) translateX(var(--translateX, 0)) translateY(var(--translateY, 0))
    }
    50% {
        transform: rotateY(90deg)
    }
    100% {
        transform: rotateY(0deg) scaleX(1) scaleY(1)
    }
}

@keyframes flipLeftBack {
    0% {
        transform: rotateY(-180deg) scaleX(var(--scaleX, 1)) scaleY(var(--scaleY, 1)) translateX(var(--translateX, 0)) translateY(var(--translateY, 0))
    }
    50% {
        transform: rotateY(-90deg)
    }
    100% {
        transform: rotateY(0deg) scaleX(1) scaleY(1)
    }
}

@keyframes animateOpacity {
    0% {
        z-index: 1;
        opacity: 0;
    }
    100% {
        z-index: 1;
        opacity: 0.8;
    }
}

@keyframes animateOpacityOut {
    0% {
        z-index: 1;
        opacity: 0.8;
    }
    99% {
        z-index: 1;
        opacity: 0;
    }
    100% {
        z-index: -1;
    }
}
`;

export default FlipAnimations;