// src/components/projects/ProjectCard.tsx

import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

const ProjectCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    padding: 2rem;
    align-self: stretch;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    backface-visibility: hidden;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: var(--glow-transition);
    box-shadow: 0 calc(var(--box-shadow-bottom) / 3) 10px 5px rgba(${({ theme }) => theme.colors.innerGlow}, 0.05),
                0 calc(var(--box-shadow-bottom) / 3 * 2) 20px 5px rgba(${({ theme }) => theme.colors.glow}, 0.1),
                0 var(--box-shadow-bottom) 30px 5px rgba(${({ theme }) => theme.colors.outerGlow}, 0.15),
                calc(var(--box-shadow-left) / 3) 0 10px 5px rgba(${({ theme }) => theme.colors.innerGlow}, 0.05),
                calc(var(--box-shadow-left) / 3 * 2) 0 20px 5px rgba(${({ theme }) => theme.colors.glow}, 0.1),
                var(--box-shadow-left) 0 30px 5px rgba(${({ theme }) => theme.colors.outerGlow}, 0.15),
                calc(var(--box-shadow-right) / 3) 0 10px 5px rgba(${({ theme }) => theme.colors.innerGlow}, 0.05),
                calc(var(--box-shadow-right) / 3 * 2) 0 20px 5px rgba(${({ theme }) => theme.colors.glow}, 0.1),
                var(--box-shadow-right) 0 30px 5px rgba(${({ theme }) => theme.colors.outerGlow}, 0.15),
                0 calc(var(--box-shadow-top) / 3) 10px 5px rgba(${({ theme }) => theme.colors.innerGlow}, 0.05),
                0 calc(var(--box-shadow-top) / 3 * 2) 20px 5px rgba(${({ theme }) => theme.colors.glow}, 0.1),
                0 var(--box-shadow-top) 30px 5px rgba(${({ theme }) => theme.colors.outerGlow}, 0.15);

    @media (min-width: 1920px) {
        padding: 3rem;
    }
    @media (min-width: 2560px) {
        padding: 4rem;
    }
`;

const ImageWrapper = styled(Image)`
    border-radius: 10px;
    margin-bottom: 2rem;
    width: 100%;
    height: auto;
    backface-visibility: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15), 
                2.5px 0 15px rgba(0, 0, 0, 0.15), 
                -2.5px 0 15px rgba(0, 0, 0, 0.15);
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

    return (
        <ProjectCardContainer onClick={flipCard}>
            <ImageWrapper src={image} alt={title} />
            <TextBackground>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </TextBackground>
        </ProjectCardContainer>
    );
};

export default ProjectCard;