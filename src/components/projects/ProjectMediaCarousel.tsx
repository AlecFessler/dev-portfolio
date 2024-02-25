import React, { useContext } from 'react';
import styled from 'styled-components';

import ModalContext from '../../state/ModalContext';

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

const ProjectMediaCarousel = ({ content }: { content: React.ReactNode[]; project: string }) => {
    const { currentSlide } = useContext(ModalContext);

    console.log('currentSlide', currentSlide);

    return (
        <CarouselContainer>
            <ContentContainer>
                {content[currentSlide]}
            </ContentContainer>
        </CarouselContainer>
    );
};

export default ProjectMediaCarousel;