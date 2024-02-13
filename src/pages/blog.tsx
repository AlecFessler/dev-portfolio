// pages/blog.tsx

import React from 'react';
import styled from 'styled-components';

import Header from '../components/blog/Header';

// Styled section for the blog
const BlogSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem;
`;

const Blog = () => {
  return (
    <BlogSection id="Blog">
        <Header />
        <h1>Blog</h1>
    </BlogSection>
  );
};

export default Blog;