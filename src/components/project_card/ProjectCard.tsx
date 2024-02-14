// src/components/project_card/ProjectCard.tsx

import React, { useRef } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

// Styled container for the project card
const ProjectCardContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    text-align: center;
    max-width: 40rem;
    height: 100%;
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
    
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
    
        // Calculate rotation values based on cursor position
        const rotateX = (y / height) * 20; // Tilt intensity for X remains the same
        const invert = y > 0 ? 1 : -1; // Invert sign for lower half of card
        const rotateY = (x / width) * 20 * invert;
    
        cardRef.current.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

    const handleMouseEnter = () => {
        if (!cardRef.current) return;

        cardRef.current.style.transition = 'none'; // Temporarily remove transition for tilt effect
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;

        cardRef.current.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        cardRef.current.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)'; // Reset position
    };

    return (
      <div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProjectCardContainer>
            <ImageWrapper src={image} alt={title} />
            <Title>{title}</Title>
            <Description>{description}</Description>
        </ProjectCardContainer>
      </div>
    );
};

export default ProjectCard;