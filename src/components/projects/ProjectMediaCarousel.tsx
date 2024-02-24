import React, { useState } from 'react';
import styled, { css, ThemeContext } from 'styled-components';

import Flip from './modal_buttons/Flip';
import Next from './modal_buttons/Next';
import Star from './modal_buttons/Star';

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
    const theme = React.useContext(ThemeContext);
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
                <Next next={nextSlide} direction='right' fill={theme?.colors.text} stroke={theme?.colors.text} />
                {content.map((_, index) => (
                    <Star key={index} onClick={closeModal}  fill={theme?.colors.text} stroke={theme?.colors.text} />
                ))}
                <Next next={prevSlide} direction='left'  fill={theme?.colors.text} stroke={theme?.colors.text} />
                <Flip flip={closeModal}  fill={theme?.colors.text} stroke={theme?.colors.text} />
            </ButtonContainer>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;