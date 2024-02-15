// src/utils/FlipManagerMachine.ts

import { createMachine, assign } from 'xstate';

/*
States:
- tiltable
- flippingToBack
- flipped
- flippingToFront

Properties:
- rotateX:
  tiltable: event.rotateX
  flippingToBack: 0
  flipped: 0
  flippingToFront: 0

- rotateY:
  tiltable: event.rotateY
  flippingToBack: 180
  flipped: 180
  flippingToFront: 0

- transition:
  tiltable: 0.6
  flippingToBack: 1.0
  flipped: 1.0
  flippingToFront: 1.0

- scaleX:
  tiltable: 1
  flippingToBack: event.scaleX
  flipped: event.scaleX
  flippingToFront: 1

- scaleY:
  tiltable: 1
  flippingToBack: event.scaleY
  flipped: event.scaleY
  flippingToFront: 1

- translateX:
  tiltable: 0
  flippingToBack: event.translateX
  flipped: event.translateX
  flippingToFront: 0

- translateY:
  tiltable: 0
  flippingToBack: event.translateY
  flipped: event.translateY
  flippingToFront: 0

- zIndex:
  tiltable: 0
  flippingToBack: 1
  flipped: 1
  flippingToFront: 1

  include an assign action for the tiltable state to assign rotateX and rotateY from the event object.
  the event will be passed on the TILT event, which will simply loop back to the tiltable state.
*/

const flipMachine = createMachine({
  id: 'flip',
  initial: 'tiltable',
  context: {
    rotateX: 0,
    rotateY: 0,
    transition: 0,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    zIndex: 0
  },
  states: {
    tiltable: {
      on: {
        FLIP_TO_BACK: 'flippingToBack',
        TILT: {
          actions: assign({
            rotateX: ({ event }) => event.rotateX,
            rotateY: ({ event }) => event.rotateY
          })
        }
      }
    },
    flippingToBack: {
      entry: assign(({ event }) => (
      {
        rotateX: 0,
        rotateY: 180,
        transition: 1.0,
        scaleX: event.scaleX,
        scaleY: event.scaleY,
        translateX: event.translateX,
        translateY: event.translateY,
        zIndex: 1
      })),
      after: { 1000: 'flipped' }
    },
    flipped: {
      on: { FLIP_TO_FRONT: 'flippingToFront' }
    },
    flippingToFront: {
      entry: assign(() => ({
        rotateX: 0,
        rotateY: 0,
        transition: 1.0,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        zIndex: 0
      })),
      after: { 1000: 'tiltable' }
    }
  }
});

export default flipMachine;