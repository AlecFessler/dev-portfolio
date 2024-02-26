// src/components/header/Header.tsx

import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import styled from 'styled-components';

import Logo from './Logo';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  padding: 1rem 2rem 1rem 0;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1000;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  letter-spacing: -1px;

  @media (min-width: 425px) {
    padding: 1rem 4rem 1rem 0;
  }
  @media (min-width: 768px) {
    padding: 1rem 5rem 1rem 0;
    font-size: ${({ theme }) => theme.fontSizes.regular};
  }
  @media (min-width: 1024px) {
    padding: 1rem 10rem 1rem 0;
  }
  @media (min-width: 1440px) {
    padding: 1rem 30rem 1rem 0;
  }
  @media (min-width: 1920px) {
    padding: 1.5rem 35rem 1.5rem 0;
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
  }
  @media (min-width: 2560px) {
    padding: 2rem 40rem 2rem 0;
    font-size: ${({ theme }) => theme.fontSizes.xxxlarge};
  }
`;

const LogoContainer = styled.div`
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 1001;
`;

const ScrollNav = styled(ScrollLink)`
  margin-left: 1rem;
  cursor: pointer;
  transition: 0.3s linear;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 15px rgba(${({ theme }) => theme.colors.glow}, 0.5);
  }

  @media (min-width: 768px) {
    margin-left: 1.5rem;
  }
  @media (min-width: 1024px) {
    margin-left: 2rem;
  }
  @media (min-width: 1440px) {
    margin-left: 2.5rem;
  }
  @media (min-width: 1920px) {
    margin-left: 3rem;
  }
  @media (min-width: 2560px) {
    margin-left: 4rem;
  }
`;

const RouterNav = styled(Link)`
  margin-left: 1rem;
  cursor: pointer;
  transition: 0.3s linear;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 15px rgba(${({ theme }) => theme.colors.glow}, 0.5);
  }

  @media (min-width: 768px) {
    margin-left: 1.5rem;
  }
  @media (min-width: 1024px) {
    margin-left: 2rem;
  }
  @media (min-width: 1440px) {
    margin-left: 2.5rem;
  }
  @media (min-width: 1920px) {
    margin-left: 3rem;
  }
  @media (min-width: 2560px) {
    margin-left: 4rem;
  }
`;

const Header = () => {
  return (
    <>
    <LogoContainer>
      <Logo />
    </LogoContainer>
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
    </>
  );
};

export default Header;