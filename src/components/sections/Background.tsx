// src/components/sections/Background.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import GalacticTear from '../../../public/galactic_tear_sm.png';

const Sticky = styled.div`
  position: sticky;
  z-index: 0;
  top: 25%;
  width: 100%;
  aspect-ratio: 400 / 103;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Background = () => {
  return (
    <Sticky>
      <Wrapper>
        <Image 
          src={GalacticTear} 
          alt="A tear in the surface of the webpage, revealing interstellar space" 
          fill={true}
          objectFit='cover'
          objectPosition='center center'
          priority={true}
          />
      </Wrapper>
    </Sticky>
  );
};

export default Background;