// src/components/sections/SkillsGraph.tsx

import React from 'react';
import styled from 'styled-components';

// Styled section for the skills graph
const SkillsGraphSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem;
`;

const SkillsGraph = () => {
  return (
    <SkillsGraphSection>
      <h1>Skills Graph</h1>
    </SkillsGraphSection>
  );
};

export default SkillsGraph;