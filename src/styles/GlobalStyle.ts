// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
        overflow-x: hidden;
    }

    body, h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd {
        margin: 0;
        padding: 0;
    }

    body {
        margin: 0;
        font-family: 'Fira Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        line-height: 1.4;
        font-size: 1.6rem;
    }

    a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
    }

    ::-webkit-scrollbar {
        width: 10px;
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.scrollbar};
        border-radius: 10px;
    }
`;

export default GlobalStyle;