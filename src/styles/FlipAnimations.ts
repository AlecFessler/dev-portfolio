// src/styles/flipAnimations.ts

import { createGlobalStyle } from 'styled-components';

const FlipAnimations = createGlobalStyle`
@keyframes flipRight {
    0% {
        transform: rotateY(0deg)
    }
    50% {
        transform: rotateY(90deg)
    }
    100% {
        transform: rotateY(180deg)
    }
}

@keyframes flipLeft {
    0% {
        transform: rotateY(0deg)
    }
    50% {
        transform: rotateY(-90deg)
    }
    100% {
        transform: rotateY(-180deg)
    }
}

@keyframes flipRightBack {
    0% {
        transform: rotateY(180deg)
    }
    50% {
        transform: rotateY(90deg)
    }
    100% {
        transform: rotateY(0deg)
    }
}

@keyframes flipLeftBack {
    0% {
        transform: rotateY(-180deg)
    }
    50% {
        transform: rotateY(-90deg)
    }
    100% {
        transform: rotateY(0deg)
    }
}
`;

export default FlipAnimations;