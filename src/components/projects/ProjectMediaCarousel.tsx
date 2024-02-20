// src/components/projects/ProjectMediaCarousel.tsx

import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
`;

const CarouselContent = styled.div`
    background: ${({ theme }) => theme.colors.secondary};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
`;

const CarouselButton = styled.button`
    flex: 1;
    padding: 10px;
    margin: 0 5px;
    cursor: pointer;
`;

const ProjectMediaCarousel = ({ content }: { content: React.ReactNode[] }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const currentSlide = content[slideIndex];
    
    const nextSlide = () => {
        setSlideIndex((slideIndex + 1) % content.length);
    };

    const prevSlide = () => {
        setSlideIndex((slideIndex - 1 + content.length) % content.length);
    };

    return (
        <CarouselContainer>
            <CarouselContent>
                {currentSlide}
            </CarouselContent>
            <ButtonContainer>
                <CarouselButton onClick={prevSlide}>Prev</CarouselButton>
                <CarouselButton onClick={nextSlide}>Next</CarouselButton>
            </ButtonContainer>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;