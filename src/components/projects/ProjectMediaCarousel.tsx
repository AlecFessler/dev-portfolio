import React, { useState } from 'react';
import styled, { css } from 'styled-components';

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
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const CarouselButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    margin: 0 10px;
    color: ${({ theme }) => theme.colors.text};
`;

const DotsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

interface DotProps {
    $isActive: boolean;
    onClick?: () => void;
}
  
const Dot = styled.span<DotProps>`
padding: 5px;
margin: 0 5px;
cursor: pointer;
background-color: white;
border-radius: 50%;
transition: transform 0.3s ease-in-out;
${({ $isActive }) =>
    $isActive &&
    css`
        transform: scale(1.2);
    `}
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
                <CarouselButton onClick={prevSlide}>&lt;</CarouselButton>
                <DotsContainer>
                    {content.map((_, index) => (
                        <Dot key={index} $isActive={index === slideIndex} onClick={() => setSlideIndex(index)} />
                    ))}
                </DotsContainer>
                <CarouselButton onClick={nextSlide}>&gt;</CarouselButton>
            </ButtonContainer>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;