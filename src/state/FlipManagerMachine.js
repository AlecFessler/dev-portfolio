// src/state/FlipManagerMachine.ts

import { createMachine, assign } from 'xstate';

const flipMachine = createMachine({
  id: 'flip',
  initial: 'lowered',
  context: {
    rotateX: 0, // tilt
    rotateY: 0, // flip, tilt
    scaleX: 1, // flip
    scaleY: 1, // flip
    translateX: 0, // flip
    translateY: 0, // flip
    transition: 0.6, // flip, set down, tilt 
    zIndex: 0, // flip
    isFlipping: false,
    isFlipped: false,
  },
  states: {
    lowered: {
      on: {
        RAISE: {
          target: 'raised',
          actions: assign(({ event }) => ({
            // the current values are valid for the rest of the properties
            rotateX: event.rotateX || 0, // vertical tilt angle
            rotateY: event.rotateY || 0, // horizontal tilt angle
            transition: 0, // set transition to 0 for immediate tilt animation responsiveness
          })),
          guard: (context) => !context.isFlipping && !context.isFlipped,
        },
      },
      entry: assign(() => ({
        // reset the context to ensure all properties are valid
        rotateX: 0,
        rotateY: 0,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        transition: 0.6,
        zIndex: 0,
        isFlipping: false,
        isFlipped: false,
      })),
    },
    raised: {
      on: {
        LOWER: {
          target: 'lowered',
          actions: assign(() => ({ // set the context for the set down animation
            // the current values are valid for the rest of the properties
            rotateX: 0, // reset rotateX after the tilt animation
            rotateY: 0, // reset rotateY after the tilt animation
            transition: 0.6, // set transition to 0.6 for gentle set down animation
          })),
          guard: (context) => !context.isFlipping && !context.isFlipped,
        },
        RAISE: {
          target: 'raised',
          actions: assign(({ event }) => ({ // set the context for the tilt animation
            // the current values are valid for the rest of the properties
            rotateX: event.rotateX || 0, // vertical tilt angle
            rotateY: event.rotateY || 0, // horizontal tilt angle
            transition: 0, // set transition to 0 for immediate tilt animation responsiveness
          })),
          guard: (context) => !context.isFlipping && !context.isFlipped,
        },
        FLIP: {
          target: 'flippingToBack',
          actions: assign(() => ({ // set the context for the flip animation
            // the actual transform values are computed and set as css variables to handle the flip animation
            rotateX: 0, // reset rotateX after the tilt animation
            rotateY: 0, // reset rotateY after the tilt animation
            zIndex: 1, // set xIndex to ensure the card is above the other cards
            isFlipping: true, // set isFlipping to true to prevent further flips
          })),
          guard: (context) => !context.isFlipping && !context.isFlipped,
        },
      },
    },
    flippingToBack: { // context is set by the FLIP event
      after: {
        1000: { target: 'flipped' }
      },
    },
    flipped: {
      on: {
        FLIP: {
          target: 'flippingToFront',
          actions: assign(() => ({ // set the context for the flip animation
            // the actual transform values are computed and set as css variables to handle the flip animation
            // zIndex is still 1 from the previous flip
            isFlipping: true, // set isFlipping to true to prevent further flips
            isFlipped: false, // card is no longer flipped
          })),
          guard: (context) => !context.isFlipping && !context.isFlipped,
        }
      },
      entry: assign(() => ({
        // the transform values are still handled by css variables by this point
        // zIndex is still 1 from the previous flip
        isFlipping: false, // flip animation is complete
        isFlipped: true, // card is flipped
      })),
    },
    flippingToFront: {
      after: {
        1000: { target: 'lowered' }
      }
    },
  },
});

export default flipMachine;