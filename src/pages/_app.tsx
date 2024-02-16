// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import FlipAnimations from '../styles/FlipAnimations';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <FlipAnimations />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;