// src/state/FlippedContext.ts

import { createContext } from 'react';

const FlippedContext = createContext({
    firstFlip: true,
    setfirstFlip: (firstFlip: boolean) => {},
    flipped: false,
    setFlipped: (flipped: boolean) => {}
});

export default FlippedContext;