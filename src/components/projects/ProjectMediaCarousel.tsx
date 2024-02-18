// src/components/projects/ProjectMediaCarousel.tsx

import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const CarouselContent = styled.div`
    background: ${({ theme }) => theme.colors.secondary};
    height: 100%;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ProjectMediaCarousel = ({ content } : { content: React.ReactNode[] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    console.log("ProjectMediaCarousel: ", content);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % content.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + content.length) % content.length);
    };

    return (
        <CarouselContainer>
            <CarouselContent>
                <button onClick={prevSlide}>Prev</button>
                <button onClick={nextSlide}>Next</button>
            </CarouselContent>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;