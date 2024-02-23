// src/components/projects/ProjectCard.tsx

import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

// Styled container for the project card
const ProjectCardContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    padding: 2rem;
    align-self: stretch;
    border-radius: 10px;
    backface-visibility: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
`;

const ImageWrapper = styled(Image)`
    border-radius: 10px;
    margin-bottom: 1rem;
    width: 100%;
    height: auto;
`;

const Title = styled.h3`
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.regular};
    margin-bottom: 1rem;
`;

const Description = styled.p`
    text-align: left;
    font-size: ${({ theme }) => theme.fontSizes.small};
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
        <ProjectCardContainer onClick={flipCard} className={'projectCard'}>
            <ImageWrapper src={image} alt={title} />
            <Title>{title}</Title>
            <Description>{description}</Description>
        </ProjectCardContainer>
    );
};

export default ProjectCard;