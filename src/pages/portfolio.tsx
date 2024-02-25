// src/components/sections/Portfolio.tsx

import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../components/header/Header';
import Hello from '../components/sections/Hello';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';
import Footer from '../components/footer/Footer';
import Background from '../components/sections/Background';

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Portfolio = () => {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#contact') {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);
  return (
    <PortfolioContainer>
      <Header />
      <Hello />
      <Background />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </PortfolioContainer>
  );
};

export default Portfolio;