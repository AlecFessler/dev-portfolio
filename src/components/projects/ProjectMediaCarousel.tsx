import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const CarouselContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    transform-style: preserve-3d;
`;

const ContentContainer = styled.div`
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.colors.border};
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 30%;
`;

const ProjectMediaCarousel = ({ content, closeModal }: { content: React.ReactNode[], closeModal: () => void }) => {
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
            <ContentContainer>
                {currentSlide}
            </ContentContainer>
            <ButtonContainer>
            </ButtonContainer>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;