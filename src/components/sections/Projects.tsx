// src/components/sections/Projects.tsx

import React from 'react';
import styled from 'styled-components';

import ProjectCard from '../project_card/ProjectCard';

// Styled section for the projects
const ProjectsSection = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    padding: 0 2rem;
`;


const Projects = () => {
  return (
    <ProjectsSection>
        <h1>Projects</h1>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
    </ProjectsSection>
  );
};

export default Projects;