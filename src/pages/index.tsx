// src/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '../components/header/Header';
import Greeting from '../components/sections/Greeting';
import Projects from '../components/sections/Projects';
import SkillsGraph from '../components/sections/SkillsGraph';
import Footer from '../components/footer/Footer';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Alec's Dev Portfolio</title>
        <meta name="description" content="Welcome to Alec's Developer Portfolio" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      
      <main>
        <Header />
        <Greeting />
        <Projects />
        <SkillsGraph />
        <Footer />
      </main>
    </div>
  );
};

export default Home;