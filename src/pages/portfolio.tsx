// src/components/sections/Portfolio.tsx

import React, { useEffect } from 'react';

import Header from '../components/header/Header';
import Hello from '../components/sections/Hello';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';
import Footer from '../components/footer/Footer';
import Background from '../components/sections/Background';

import FlippedContextProvider from '../../src/components/context_providers/FlippedContext';

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
    <>
      <FlippedContextProvider>
        <Header />
        <Hello />
        <Background />
        <Projects />
        {/*<Skills />
        <Contact />*/}
        <Footer />
      </FlippedContextProvider>
    </>
  );
};

export default Portfolio;