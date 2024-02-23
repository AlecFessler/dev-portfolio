// src/styles/theme.ts

const theme = {
    colors: {
        primary: '#398ad7',   // Primary color
        secondary: '#404A60', // Secondary color
        background: '#23272a', // Background color
        text: '#ffffff', // Primary text
        secondaryText: '#bbbbbb', // Secondary text
        border: '#dddddd',     // Border color
        scrollbar: '#1c1f23',  // Scrollbar color
    },
    fonts: {
        body: "'Fira Sans', sans-serif",
        heading: "'Poppins', sans-serif",
        monospace: "'Courier Prime', monospace",
    },
    fontSizes: {
        xsmall: '1.2rem', // 12px, for less prominent information or captions
        small: '1.4rem', // 14px, suitable for secondary text
        medium: '1.6rem', // 16px, standard body text size
        regular: '1.8rem', // 18px, slightly larger text, could be used for lead paragraphs
        large: '2.0rem', // 20px, for highlighted information or subheadings
        xlarge: '2.4rem', // 24px, for smaller headings
        xxlarge: '3.0rem', // 30px, for main headings
        xxxlarge: '3.6rem', // 36px, for standout headings or important calls to action
        huge: '4.8rem', // 48px, for major headings or key page elements
        xhuge: '6.0rem', // 60px, for very large headings, like on landing pages
        xxhuge: '7.2rem', // 72px, ultra-large text, possibly for hero sections
        xxxhuge: '9rem', // 84px, for the largest text on the largest screens
    },
};
  
export default theme;  