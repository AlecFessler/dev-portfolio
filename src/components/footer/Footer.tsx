// src/components/footer/Footer.tsx

import React, { useContext } from 'react';
import styled from 'styled-components';

import FlippedContext from '../../state/FlippedContext';

// Styled section for the footer
const FooterSection = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 20rem;

  &.fadeOut {
    animation: fadeOut 0.6s forwards;
  }

  &.fadeIn {
    animation: fadeIn 0.6s forwards;
  }
`;

const Footer = () => {

  const { flipped, firstFlip } = useContext(FlippedContext);

  return (
    <FooterSection className={firstFlip ? '' : flipped ? 'fadeOut' : 'fadeIn'}>
      <p>© 2024 Alec Fessler | All rights reserved</p>
    </FooterSection>
  );
};

export default Footer;