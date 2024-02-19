// src/components/projects/ProjectCard.tsx

import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

// Styled container for the project card
const ProjectCardContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    padding: 2rem;
    height: 100%;
    text-align: center;
    border-radius: 10px;
    backface-visibility: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const ImageWrapper = styled(Image)`
    border-radius: 10px;
    margin-bottom: 1rem;
    width: 100%;
    height: auto;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-family: ${({ theme }) => theme.fonts.heading};
`;

const Description = styled.p`
    font-size: 1.5rem;
    text-align: left;
`;

interface ProjectCardProps {
    image: StaticImageData;
    title: string;
    description: string;
    flipCard: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, flipCard }) => {
    return (
        <ProjectCardContainer onClick={flipCard}>
            <ImageWrapper src={image} alt={title} />
            <Title>{title}</Title>
            <Description>{description}</Description>
        </ProjectCardContainer>
    );
};

export default ProjectCard;