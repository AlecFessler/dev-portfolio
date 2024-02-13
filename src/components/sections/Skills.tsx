// src/components/sections/Skills.tsx

import React from 'react';
import styled from 'styled-components';

// Styled section for the skills graph
const SkillsSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem;
`;

const Skills = () => {
  return (
    <SkillsSection id="Skills">
      <h1>Skills Graph</h1>
    </SkillsSection>
  );
};

export default Skills;