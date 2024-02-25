// src/state/ModalContext.ts

import { createContext } from 'react';

type ModalContextType = {
    currentModal: string | null;
    totalSlides: number;
    currentSlide: number;
    setModal: (modal: string | null) => void;
    setTotalSlides: (totalSlides: number) => void;
    setCurrentSlide: (currentSlide: number) => void;
};

const ModalContext = createContext<ModalContextType>({
    currentModal: null,
    totalSlides: 0,
    currentSlide: 0,
    setModal: () => {},
    setTotalSlides: () => {},
    setCurrentSlide: () => {},
});

export default ModalContext;