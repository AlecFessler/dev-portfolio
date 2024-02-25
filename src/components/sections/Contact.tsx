// src/components/sections/Contact.tsx

import React from 'react';
import styled from 'styled-components';

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
`;

const Contact = () => {
  return (
    <ContactSection id="Contact">
      <h1>Contact</h1>
    </ContactSection>
  );
};

export default Contact;