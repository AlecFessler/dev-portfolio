// src/components/sections/Skills.tsx

import React, { useContext } from 'react';
import styled from 'styled-components';

import FlippedContext from '../../state/FlippedContext';

// Styled section for the skills graph
const SkillsSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem;

  &.fadeOut {
    animation: fadeOut 0.6s forwards;
  }

  &.fadeIn {
    animation: fadeIn 0.6s forwards;
  }
`;

const Skills = () => {

  const { firstFlip, flipped } = useContext(FlippedContext);

  return (
    <SkillsSection id="Skills" className={firstFlip ? '' : flipped ? 'fadeOut' : 'fadeIn'}>
      <h1>Skills Graph</h1>
    </SkillsSection>
  );
};

export default Skills;