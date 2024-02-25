// src/components/context_providers/ModalContextProvider.tsx

import React, { useState } from 'react';
import ModalContext from '../../state/ModalContext';

type ModalContextProviderProps = {
    children: React.ReactNode;
};

const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
    const [totalSlides, setTotalSlides] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentModal, setModal] = useState<string | null>(null);

    return (
        <ModalContext.Provider value={{ currentModal, totalSlides, currentSlide, setModal, setTotalSlides, setCurrentSlide }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;