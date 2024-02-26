// src/components/sections/Contact.tsx

import React, { useContext } from 'react';
import styled from 'styled-components';

import FlippedContext from '../../state/FlippedContext';

// Styled section for the contact form
const ContactSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem;

  &.fadeOut {
    animation: fadeOut 0.6s forwards;
  }

  &.fadeIn {
    animation: fadeIn 0.6s forwards;
  }
`;

const Contact = () => {
  const { firstFlip, flipped } = useContext(FlippedContext);

  return (
    <ContactSection id="Contact" className={firstFlip ? '' : flipped ? 'fadeOut' : 'fadeIn'}>
      <h1>Contact</h1>
    </ContactSection>
  );
};

export default Contact;