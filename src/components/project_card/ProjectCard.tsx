// src/components/project_card/ProjectCard.tsx

import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

// Styled container for the project card
const ProjectCardContainer = styled.div`
  width: 100%;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  margin: 1rem;
  text-align: center;
`;

interface ProjectCardProps {
  image: StaticImageData;
  title: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description }) => {
  return (
    <ProjectCardContainer>
      <Image src={image} alt={title} width={300} height={300} />
      <h2>{title}</h2>
      <p>{description}</p>
    </ProjectCardContainer>
  );
};

export default ProjectCard;