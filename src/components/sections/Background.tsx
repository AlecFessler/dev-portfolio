// src/components/sections/Background.tsx

import React from 'react';
import styled from 'styled-components';

import GalacticTear from '../../../public/galactic_tear.png';

import MeteorClusterOne from '../fun_stuff/MeteorClusterOne';
import MeteorClusterTwo from '../fun_stuff/MeteorClusterTwo';

const Sticky = styled.div`
  position: sticky;
  z-index: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  aspect-ratio: 16 / 9;
  margin-top: -15%;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-image: url(${GalacticTear.src});
  background-size: cover;
  background-position: center;
`;

const Background = () => {
  return (
    <Sticky>
      <MeteorClusterOne />
      <MeteorClusterTwo />
      <BackgroundImage />
    </Sticky>
  );
};

export default Background;