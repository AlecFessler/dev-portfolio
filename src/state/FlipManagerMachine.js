// src/state/FlipManagerMachine.ts

/*
- add lowered state as default
- add raised state

- lowered to raised
- raised to lowered, raised, flippingToBack
*/

import { createMachine, assign } from 'xstate';

const flipMachine = createMachine({
  id: 'flip',
  initial: 'unflipped',
  context: {
    rotateX: 0,
    rotateY: 0,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    transition: 1.0,
    zIndex: 0,
    isFlipping: false,
  },
  states: {
    unflipped: {
      entry: assign({
        rotateX: 0,
        rotateY: 0,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        transition: 1.0,
        zIndex: 0,
      }),
      on: {
        FLIP: {
          target: 'flippingToBack',
          actions: assign(({ event }) => ({
            scaleX: event.scaleX,
            scaleY: event.scaleY,
            translateX: event.translateX,
            translateY: event.translateY,
            transition: 1.0,
            zIndex: 1,
            isFlipping: true,
            guard: (context, event) => !context.isFlipping,
          })),
        },
      },
    },
    flippingToBack: {
      after: {
        1000: { target: 'flipped' }
      },
    },
    flipped: {
      on: {
        FLIP: {
          target: 'flippingToFront',
          actions: assign(({ event }) => ({
            scaleX: event.scaleX,
            scaleY: event.scaleY,
            translateX: event.translateX,
            translateY: event.translateY,
            transition: 1.0,
            zIndex: 1,
            isFlipping: true,
            guard: (context, event) => !context.isFlipping,
          })),
        }
      },
    },
    flippingToFront: {
      after: {
        1000: { target: 'unflipped' }
      }
    },
  },
});

export default flipMachine;