// src/state/FlipManagerMachine.ts

import { createMachine, assign } from 'xstate';

import ProjectCardConstants from './ProjectCardConstants';

const { FLIP_DURATION } = ProjectCardConstants;

const flipMachine = createMachine({
  id: 'flip',
  initial: 'unflipped',
  context: {
    isFlipping: false,
    isFlipped: false,
  },
  states: {
    unflipped: {
      on: {
        FLIP: {
          target: 'flippingToBack',
          actions: assign(() => ({
            isFlipping: true,
          })),
          guard: (context) => !context.isFlipping && !context.isFlipped,
        },
      },
      entry: assign(() => ({
        isFlipping: false,
        isFlipped: false,
      })),
    },
    flippingToBack: {
      after: {
        [FLIP_DURATION * 1000]: { target: 'flipped' }
      },
    },
    flipped: {
      on: {
        FLIP: {
          target: 'flippingToFront',
          actions: assign(() => ({
            isFlipping: true,
            isFlipped: false,
          })),
          guard: (context) => !context.isFlipping && !context.isFlipped,
        }
      },
      entry: assign(() => ({
        isFlipping: false,
        isFlipped: true,
      })),
    },
    flippingToFront: {
      after: {
        [FLIP_DURATION * 1000]: { target: 'unflipped' }
      }
    },
  },
});

export default flipMachine;