// src/components/footer/Footer.tsx

import React from 'react';
import styled from 'styled-components';

// Styled section for the footer
const FooterSection = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Footer = () => {
  return (
    <FooterSection>
      <p>Footer</p>
    </FooterSection>
  );
};

export default Footer;