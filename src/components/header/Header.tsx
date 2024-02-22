// src/components/header/Header.tsx

import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1000;
  @media (max-width: 375px) {
    justify-content: center;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (min-width: 601px) {
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

const ScrollNav = styled(ScrollLink)`
  margin-left: 2rem;
  cursor: pointer;
  transition: color 0.2s;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media (max-width: 375px) {
    margin-left: 1.5rem;
  }
`;

const RouterNav = styled(Link)`
  margin-left: 2rem;
  cursor: pointer;
  transition: color 0.2s;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media (max-width: 375px) {
    margin-left: 1.5rem;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <ScrollNav to="Hello" smooth={true} duration={500}>
          Hello
        </ScrollNav>
        <ScrollNav to="Projects" smooth={true} duration={500}>
          Projects
        </ScrollNav>
        <ScrollNav to="Skills" smooth={true} duration={500}>
          Skills
        </ScrollNav>
        <ScrollNav to="Contact" smooth={true} duration={500}>
          Contact
        </ScrollNav>
        <RouterNav href="/blog" passHref>
          Blog
        </RouterNav>
      </nav>
    </HeaderContainer>
  );
};

export default Header;