import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import NextButton from '../../../public/buttons/next.png';
import PrevButton from '../../../public/buttons/prev.png';

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
    justify-content: space-between;
    width: 100%;
`;

const Button = styled(Image)`
    cursor: pointer;
    height: ${({ theme }) => theme.buttonSizes.small};
    width: ${({ theme }) => theme.buttonSizes.small};
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
                <Button src={PrevButton} alt="Previous" onClick={prevSlide} />
                <button onClick={closeModal}>Close</button>
                <Button src={NextButton} alt="Next" onClick={nextSlide} />
            </ButtonContainer>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;