// src/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';

import Main from './portfolio';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Alec's Dev Portfolio</title>
        <meta name="description" content="Welcome to Alec's Developer Portfolio" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <Main />
    </div>
  );
};

export default Home;