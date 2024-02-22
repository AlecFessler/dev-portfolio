// src/styles/flipAnimations.ts

import { createGlobalStyle } from 'styled-components';

const FlipAnimations = createGlobalStyle`
@keyframes flipRight {
    0% {
        transform: rotate3d(0, 1, 0, 0deg) scale3d(1, 1, 1) translate3d(0, 0, 0)
    }
    50% {
        transform: rotate3d(0, 1, 0, 90deg)
    }
    100% {
        transform: rotate3d(0, 1, 0, 180deg) scale3d(var(--scaleX, 1), var(--scaleY, 1), 1) translate3d(var(--translateX, 0), var(--translateY, 0), 0)
    }
}

@keyframes flipLeft {
    0% {
        transform: rotate3d(0, 1, 0, 0deg) scale3d(1, 1, 1) translate3d(0, 0, 0)
    }
    50% {
        transform: rotate3d(0, 1, 0, -90deg)
    }
    100% {
        transform: rotate3d(0, 1, 0, -180deg) scale3d(var(--scaleX, 1), var(--scaleY, 1), 1) translate3d(var(--translateX, 0), var(--translateY, 0), 0)
    }
}

@keyframes flipRightBack {
    0% {
        transform: rotate3d(0, 1, 0, 180deg) scale3d(var(--scaleX, 1), var(--scaleY, 1), 1) translate3d(var(--translateX, 0), var(--translateY, 0), 0)
    }
    50% {
        transform: rotate3d(0, 1, 0, 90deg)
    }
    100% {
        transform: rotate3d(0, 1, 0, 0deg) scale3d(1, 1, 1) translate3d(0, 0, 0)
    }
}

@keyframes flipLeftBack {
    0% {
        transform: rotate3d(0, 1, 0, -180deg) scale3d(var(--scaleX, 1), var(--scaleY, 1), 1) translate3d(var(--translateX, 0), var(--translateY, 0), 0)
    }
    50% {
        transform: rotate3d(0, 1, 0, -90deg)
    }
    100% {
        transform: rotate3d(0, 1, 0, 0deg) scale3d(1, 1, 1) translate3d(0, 0, 0)
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