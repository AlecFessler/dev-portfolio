import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const CarouselContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5px;
    
    @media (min-width: 375px) {
        padding: 5px;
    }
    @media (min-width: 425px) {
        padding: 7.5px;
    }
    @media (min-width: 1440px) {
        padding: 12.5px;
    }
    @media (min-width: 1920px) {
        padding: 17.5px;
    }
`;

const CarouselButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin: 0 15px;
    padding: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.medium};

    @media (min-width: 375px) {
        font-size: ${({ theme }) => theme.fontSizes.regular};
    }
    @media (min-width: 425px) {
        font-size: ${({ theme }) => theme.fontSizes.large};
    }
    @media (min-width: 1440px) {
        font-size: ${({ theme }) => theme.fontSizes.xlarge};
    }
    @media (min-width: 1920px) {
        margin: 0 20px;
        font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    }
`;

const CloseModalButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.medium};

    @media (min-width: 375px) {
        font-size: ${({ theme }) => theme.fontSizes.regular};
    }
    @media (min-width: 425px) {
        font-size: ${({ theme }) => theme.fontSizes.large};
    }
    @media (min-width: 1440px) {
        font-size: ${({ theme }) => theme.fontSizes.xlarge};
    }
    @media (min-width: 1920px) {
        font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    }
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
padding: 3.5px;
margin: 0 5px;
cursor: pointer;
background-color: white;
border-radius: 50%;
transition: transform 0.3s ease-in-out;
${({ $isActive }) =>
    $isActive &&
    css`
        transform: scale(1.3);
    `
}

@media (min-width: 425px) {
    margin: 0 7.5px;
}
@media (min-width: 1440px) {
    margin: 0 10px;
    padding: 5px;
    ${({ $isActive }) =>
        $isActive &&
        css`
            transform: scale(1.2);
        `
    }
}
@media (min-width: 1920px) {
    margin: 0 12.5px;
    padding: 7.5px;
}
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
            {currentSlide}
            <ButtonContainer>
                {/* REPLACE THESE WITH IMAGES FOR NICE BUTTONS */}
                <CarouselButton onClick={prevSlide}>&lt;</CarouselButton>
                <DotsContainer>
                    {content.map((_, index) => (
                        <Dot key={index} $isActive={index === slideIndex} onClick={() => setSlideIndex(index)} />
                    ))}
                </DotsContainer>
                <CarouselButton onClick={nextSlide}>&gt;</CarouselButton>
                <CloseModalButton onClick={closeModal}>X</CloseModalButton>
            </ButtonContainer>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;