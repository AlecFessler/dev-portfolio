// src/components/project_card/ProjectCard.tsx

import React from 'react';
import styled from 'styled-components';

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

const ProjectCard = () => {
  return (
    <ProjectCardContainer>
      <h2>Project Card</h2>
    </ProjectCardContainer>
  );
};

export default ProjectCard;