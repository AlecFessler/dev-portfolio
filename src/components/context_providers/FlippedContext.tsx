// src/components/context_providers/FlippedContext.tsx

import React, { useState } from 'react';

import FlippedContext from '../../state/FlippedContext';

const FlippedContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [firstFlip, setfirstFlip] = useState(true);
    const [flipped, setFlipped] = useState(false);

    return (
        <FlippedContext.Provider value={{ firstFlip, setfirstFlip, flipped, setFlipped }}>
            {children}
        </FlippedContext.Provider>
    );
}

export default FlippedContextProvider;