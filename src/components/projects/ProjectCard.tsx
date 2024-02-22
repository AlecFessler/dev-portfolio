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
    text-align: center;
    border-radius: 10px;
    backface-visibility: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    @media (min-width: 350px) { // 350 - 700 are for sizing when there's one card per row
        width: 90%;
    }
    @media (min-width: 400px) {
        width: 80%;
    }
    @media (min-width: 450px) {
        width: 75%;
    }
    @media (min-width: 500px) {
        width: 70%;
    }
    @media (min-width: 525px) {
        width: 60%;
    }
    @media (min-width: 600px) {
        width: 55%;
    }
    @media (min-width: 650px) {
        width: 50%;
    }
    @media (min-width: 700px) {
        width: 45%;
    }
    @media (min-width: 768px) { // 2 cards per row starts now
        width: 100%;
    }
    @media (min-width: 1024px) {
    }
    @media (min-width: 1440px) {
    }
    @media (min-width: 2560px) {
    }
`;

const ImageWrapper = styled(Image)`
    border-radius: 10px;
    margin-bottom: 1rem;
    width: 100%;
    height: auto;
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 1rem;
    font-family: ${({ theme }) => theme.fonts.heading};
    @media (min-width: 500px) {
        font-size: 2.25rem
    }
    @media (min-width: 768px) {
    }
    @media (min-width: 1024px) {
    }
    @media (min-width: 1440px) {
    }
    @media (min-width: 2560px) {
    }
`;

const Description = styled.p`
    font-size: 1.25rem;
    text-align: left;
    @media (min-width: 600px) {
        font-size: 1.375rem;
    }
    @media (min-width: 768px) {
    }
    @media (min-width: 1024px) {
    }
    @media (min-width: 1440px) {
    }
    @media (min-width: 2560px) {
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
        <ProjectCardContainer onClick={flipCard} className={'projectCard'}>
            <ImageWrapper src={image} alt={title} />
            <Title>{title}</Title>
            <Description>{description}</Description>
        </ProjectCardContainer>
    );
};

export default ProjectCard;