import React, { useState } from 'react';
import styled from 'styled-components';

import Next from './modal_buttons/Next';
import Close from './modal_buttons/Close';

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
    box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.2),
                -10px 10px 15px 0 rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
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
                <Next onClick={prevSlide} side="left" />
                <Close onClick={closeModal} />
                <Next onClick={nextSlide} side="right" />
            </ButtonContainer>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;