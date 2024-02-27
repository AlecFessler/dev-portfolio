// src/components/projects/ProjectCard.tsx

import React, { useContext } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import FlippedContext from '../../state/FlippedContext';

const ProjectCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.9;
    color: ${({ theme }) => theme.colors.text};
    padding: 2rem;
    align-self: stretch;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    backface-visibility: hidden;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: var(--glow-transition);
    box-shadow: calc(var(--h-shadow) / 3) calc(var(--v-shadow) / 3) 10px 1px rgba(${({ theme }) => theme.colors.innerGlow}, 0.8),
                calc(var(--h-shadow) / 3 * 2) calc(var(--v-shadow) / 3 * 2) 10px 5px rgba(${({ theme }) => theme.colors.glow}, 0.5),
                var(--h-shadow) var(--v-shadow) 30px 10px rgba(${({ theme }) => theme.colors.outerGlow}, 0.5);
    @media (min-width: 1920px) {
        padding: 3rem;
    }
    @media (min-width: 2560px) {
        padding: 4rem;
    }

    &.fadeOut {
        animation: fadeOut 0.6s forwards;
    }

    &.fadeIn {
        animation: fadeIn 0.6s forwards;
    }
`;

const StyledImage = styled(Image)`
    border-radius: 10px;
    width: 100%;
    height: auto;
    backface-visibility: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15), 
    2.5px 0 15px rgba(0, 0, 0, 0.15), 
    -2.5px 0 15px rgba(0, 0, 0, 0.15);
    margin-bottom: 2rem;
    transform: translate3d(0, 0, 5px);
    

    @media (min-width: 1920px) {
        margin-bottom: 3rem;
    }
    @media (min-width: 2560px) {
        margin-bottom: 4rem;
    }
`;

const TextBackground = styled.div`
    background-color: rgba(${({ theme }) => theme.colors.shadedContainer});
    padding: 1rem;
    border-radius: 10px;
    backface-visibility: hidden;
    flex-grow: 1;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15), 
                2.5px 0 15px rgba(0, 0, 0, 0.15), 
                -2.5px 0 15px rgba(0, 0, 0, 0.15);
    transform: translate3d(0, 0, 5px);
`;

const Title = styled.h3`
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.regular};
    margin-bottom: 1rem;
    letter-spacing: -1.25px;
    
    @media (min-width: 375px) {
        font-size: ${({ theme }) => theme.fontSizes.large};
    }
    @media (min-width: 1024px) {
        font-size: ${({ theme }) => theme.fontSizes.xlarge};
    }
    @media (min-width: 1920px) {
        font-size: ${({ theme }) => theme.fontSizes.xxlarge};
        margin-bottom: 1.5rem;
    }
    @media (min-width: 2560px) {
        font-size: ${({ theme }) => theme.fontSizes.huge};
        margin-bottom: 2rem;
    }
`;

const Description = styled.p`
    text-align: left;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};

    @media (min-width: 375px) {
        font-size: ${({ theme }) => theme.fontSizes.small};
    }
    @media (min-width: 1024px) {
        font-size: ${({ theme }) => theme.fontSizes.smedium};
    }
    @media (min-width: 1920px) {
        font-size: ${({ theme }) => theme.fontSizes.xlarge};
    }
    @media (min-width: 2560px) {
        font-size: ${({ theme }) => theme.fontSizes.xxlarge};
        line-height: 1.6;
    }
`;

interface ProjectCardProps {
    image: StaticImageData;
    title: string;
    description: string;
    flipCard: () => void;
    height: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, flipCard }) => {
    const { flipped, firstFlip } = useContext(FlippedContext);

    return (
        <ProjectCardContainer onClick={flipCard} className={firstFlip ? '' : flipped ? 'fadeOut' : 'fadeIn'}>
            <StyledImage src={image} alt={title} />
            <TextBackground>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </TextBackground>
        </ProjectCardContainer>
    );
};

export default ProjectCard;