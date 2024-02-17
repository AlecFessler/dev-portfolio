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

@keyframes flipLeftBack {
    0% {
        transform: rotateY(180deg) scaleX(var(--scaleX, 1)) scaleY(var(--scaleY, 1)) translateX(var(--translateX, 0)) translateY(var(--translateY, 0))
    }
    50% {
        transform: rotateY(90deg)
    }
    100% {
        transform: rotateY(0deg) scaleX(1) scaleY(1) translateX(0) translateY(0)
    }
}

@keyframes flipRightBack {
    0% {
        transform: rotateY(-180deg) scaleX(var(--scaleX, 1)) scaleY(var(--scaleY, 1)) translateX(var(--translateX, 0)) translateY(var(--translateY, 0))
    }
    50% {
        transform: rotateY(-90deg)
    }
    100% {
        transform: rotateY(0deg) scaleX(1) scaleY(1) translateX(0) translateY(0)
    }
}
`;

export default FlipAnimations;