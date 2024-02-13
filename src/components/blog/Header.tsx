// src/components/blog/Header.tsx

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// Styled header for the blog

const HeaderContainer = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    z-index: 1000;
`;

const TitleSubtitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeaderSubtitle = styled.h2`
    font-size: 1.5rem;
`;

const LinksContainer = styled.nav`
    display: flex;
    align-items: center;
    margin-left: auto;
    align-self: flex-start;
`;

const RouterNav = styled(Link)`
    margin: 0 1rem;
    cursor: pointer;
    transition: color 0.2s;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    align-self: flex-start;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Header = () => {
  return (
    <HeaderContainer>
        <TitleSubtitleContainer>
            <HeaderTitle>Blog</HeaderTitle>
            <HeaderSubtitle>Thoughts, stories and ideas.</HeaderSubtitle>
        </TitleSubtitleContainer>
        <LinksContainer>
            <RouterNav href="/portfolio" passHref>Portfolio</RouterNav>
            <RouterNav href="/#Contact" passHref>Contact</RouterNav>
        </LinksContainer>
    </HeaderContainer>
  );
};

export default Header;