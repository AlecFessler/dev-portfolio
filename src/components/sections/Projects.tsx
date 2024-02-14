// src/components/sections/Projects.tsx

import React from 'react';
import styled from 'styled-components';

import ProjectCard from '../project_card/ProjectCard';

import BarbellImg from '../../../public/project_cards/barbell.webp';
import PaintingImg from '../../../public/project_cards/painting.webp';
import CircuitImg from '../../../public/project_cards/circuit.webp';
import TypewriterImg from '../../../public/project_cards/typewriter.webp';
import BedframeImg from '../../../public/project_cards/bedframe.webp';

// Styled section for the projects
const ProjectsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Divide into 2 columns
  grid-gap: 2rem; // Add gap between cards
  justify-items: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem;
`;

const Projects = () => {
  return (
    <ProjectsSection id="Projects">
        <ProjectCard image={BarbellImg} title="Level Up Exercise Log" description="" />
        <ProjectCard image={PaintingImg} title="Fesslerpainting.com" description="" />
        <ProjectCard image={CircuitImg} title="Turing Complete CPU Architecture" description="" />
        <ProjectCard image={TypewriterImg} title="Interactive Story Generator" description="" />
        <ProjectCard image={BedframeImg} title="Floating Bedframe" description="" />
    </ProjectsSection>
  );
};

export default Projects;