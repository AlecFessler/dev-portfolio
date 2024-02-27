import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import NextButton from '../../../public/buttons/next.png';
import PrevButton from '../../../public/buttons/prev.png';
import CloseButton from '../../../public/buttons/close.png';

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
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Button = styled(Image)<{ $side: 'left' | 'right' | '' }>`
    cursor: pointer;
    height: ${({ theme }) => theme.buttonSizes.small};
    width: ${({ theme }) => theme.buttonSizes.small};
    margin: 0 10px;
    transform: ${({ $side }) => $side === 'left' ? 'rotateZ(30deg)' : $side === 'right' ? 'rotateY(180deg) rotateZ(30deg)' : ''};
    transition: 0.2s ease-in-out;

    &:hover {
        transform: ${({ $side }) => $side === 'left' ? 'rotateZ(30deg)' : $side === 'right' ? 'rotateY(180deg) rotateZ(30deg)' : ''} scale(1.1);
    }
`;

const XButton = styled(Image)`
    cursor: pointer;
    height: calc(${({ theme }) => theme.buttonSizes.small} + 1rem);
    width: calc(${({ theme }) => theme.buttonSizes.small} + 1rem);
    margin: 0 10px;
    transition: 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;

const ProjectMediaCarousel = ({ content, closeModal }: { content: React.ReactNode[], closeModal: () => void }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % content.length);
    }

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + content.length) % content.length);
    }

    return (
        <CarouselContainer>
            <ContentContainer>
                {content[currentSlide]}
            </ContentContainer>
            <ButtonContainer>
                <Button src={PrevButton} alt='Previous' onClick={prevSlide} $side={'left'} />
                <XButton src={CloseButton} alt='Close' onClick={closeModal} />
                <Button src={NextButton} alt='Next' onClick={nextSlide} $side={'right'} />
            </ButtonContainer>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;