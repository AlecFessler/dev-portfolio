// src/components/header/Header.tsx

import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 100vw;
  text-align: right;
  padding: 1rem 2rem 1rem 0;
  font-size: clamp(1.25rem, 1vw + 1rem, 2.5rem);
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1000;
  @media (min-width: 1440px) {
    padding: 2rem 2rem 2rem 0;
    font-size: clamp(2.5rem, 2vw, 3.5rem);
  }
  @media (min-width: 1920px) {
    padding: 3rem 2rem 3rem 0;
    font-size: clamp(3.5rem, 2vw, 4.5rem);
  }
`;

const ScrollNav = styled(ScrollLink)`
  margin-left: clamp(1rem, 2vw, 3rem);
  cursor: pointer;
  transition: color 0.2s;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RouterNav = styled(Link)`
  margin-left: clamp(1rem, 2vw, 3rem);
  cursor: pointer;
  transition: color 0.2s;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
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