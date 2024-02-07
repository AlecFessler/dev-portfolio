import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Alec's Dev Portfolio</title>
        <meta name="description" content="Welcome to Alec's Developer Portfolio" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      
      <main>
        <h1>Welcome to My Portfolio</h1>
        {/* Your content here */}
      </main>
    </div>
  );
};

export default Home;