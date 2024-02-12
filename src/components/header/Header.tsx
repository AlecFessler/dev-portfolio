// src/components/header/Header.tsx

import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1000;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Header</h1>
    </HeaderContainer>
  );
};

export default Header;