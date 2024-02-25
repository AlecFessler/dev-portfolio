// src/components/sections/Background.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import GalacticTear from '../../../public/galactic_tear.png';

const Sticky = styled.div`
  position: sticky;
  z-index: 0;
  top: 25%;
  min-height: 100vh;
  width: 100%;
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
        <Image src={GalacticTear} alt="Galactic Tear" fill={true} />
      </Wrapper>
    </Sticky>
  );
};

export default Background;