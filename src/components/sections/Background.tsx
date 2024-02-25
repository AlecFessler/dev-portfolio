// src/components/sections/Background.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import GalacticTear from '../../../public/galactic_tear.png';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Background = () => {
  return (
    <Wrapper>
      <Image src={GalacticTear} alt="Galactic Tear" fill={true} />
    </Wrapper>
  );
};

export default Background;