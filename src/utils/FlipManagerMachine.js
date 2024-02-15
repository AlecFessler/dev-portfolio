// src/utils/FlipManagerMachine.ts

import { createMachine, assign } from 'xstate';

/*
States:
- lowered
- tiltable
- flippingToBack
- flipped
- flippingToFront

Properties:
- rotateX:
  lowered: 0
  tiltable: event.rotateX
  flippingToBack: 0
  flipped: 0
  flippingToFront: 0

- rotateY:
  lowered: 0
  tiltable: event.rotateY
  flippingToBack: 180
  flipped: 180
  flippingToFront: 0

- transition:
  lowered: 0.6
  tiltable: 0.6
  flippingToBack: 1.0
  flipped: 1.0
  flippingToFront: 1.0

- scaleX:
  lowered: 1
  tiltable: 1
  flippingToBack: event.scaleX
  flipped: event.scaleX
  flippingToFront: 1

- scaleY:
  lowered: 1
  tiltable: 1
  flippingToBack: event.scaleY
  flipped: event.scaleY
  flippingToFront: 1

- translateX:
  lowered: 0
  tiltable: 0
  flippingToBack: event.translateX
  flipped: event.translateX
  flippingToFront: 0

- translateY:
  lowered: 0
  tiltable: 0
  flippingToBack: event.translateY
  flipped: event.translateY
  flippingToFront: 0

- zIndex:
  lowered: 0
  tiltable: 0
  flippingToBack: 1
  flipped: 1
  flippingToFront: 1

  include an assign action for the tiltable state to assign rotateX and rotateY from the event object.
  the event will be passed on the TILT event, which will simply loop back to the tiltable state.
*/

const flipMachine = createMachine({
  id: 'flip',
  initial: 'lowered',
  context: {
    rotateX: 0,
    rotateY: 0,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    transition: 0.6,
    zIndex: 0,
  },
  states: {
    lowered: {
      entry: assign({
        rotateX: 0,
        rotateY: 0,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        transition: 0.6,
        zIndex: 0,
      }),
      on: {
        TILT: {
          target: 'tiltable',
          actions: assign((context, event) => ({
            rotateX: event.rotateX,
            rotateY: event.rotateY,
            transition: 0,
          })),
        },
      },
    },
    tiltable: {
      on: {
        TILT: {
          target: 'tiltable',
          actions: assign((context, event) => ({
            rotateX: event.rotateX,
            rotateY: event.rotateY,
            transition: 0,
          })),
        },
        LOWER: { target: 'lowered'},
        FLIP: {
          target: 'flippingToBack',
          actions: assign((context, event) => ({
            scaleX: event.scaleX,
            scaleY: event.scaleY,
            translateX: event.translateX,
            translateY: event.translateY,
            transition: 1.0,
            zIndex: 1,
          })),
        }
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
          actions: assign((context, event) => ({
            scaleX: event.scaleX,
            scaleY: event.scaleY,
            translateX: event.translateX,
            translateY: event.translateY,
            transition: 1.0,
            zIndex: 1,
          })),
        }
      },
    },
    flippingToFront: {
      after: {
        1000: { target: 'lowered' }
      }
    },
  },
});

export default flipMachine;