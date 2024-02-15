// src/utils/FlipManagerMachine.ts

import { createMachine, assign } from 'xstate';

const flipMachine = createMachine({
  id: 'flip',
  initial: 'tiltable',
  context: {
    rotateY: 0,
    transition: 0,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
  },
  states: {
    tiltable: {
      on: {
        FLIP_TO_BACK: 'flippingToBack'
      }
    },
    flippingToBack: {
      entry: assign(({ event }) => (
      {
        rotateY: 180,
        transition: 0.6,
        scaleX: event.scaleX,
        scaleY: event.scaleY,
        translateX: event.translateX,
        translateY: event.translateY,
      })),
      after: { 600: 'flipped' }
    },
    flipped: {
      on: { FLIP_TO_FRONT: 'flippingToFront' }
    },
    flippingToFront: {
      entry: assign(() => ({
        rotateY: 0,
        transition: 0.6,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0
      })),
      after: { 600: 'tiltable' }
    }
  }
});

export default flipMachine;