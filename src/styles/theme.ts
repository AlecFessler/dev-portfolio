// src/styles/theme.ts

const theme = {
    buttonSizes: {
        small: '80px', // Suitable for icon buttons or compact spaces
        medium: '48px', // Default size for most buttons
        large: '64px', // For more prominent buttons or calls to action
        xlarge: '80px', // Extra large buttons, possibly for hero sections or major actions
    },
    colors: {
        primary: '#2283ea',   // Primary color
        secondary: '#2F3C4F', // Secondary color
        tertiary: '48,101,140', // Tertiary, dark navy
        background: '#1A1A1A', // Background color
        backgroundSecondary: '#23272a', // Secondary background color
        shadedContainer: '0, 0, 0, 0.3', // Shaded container color
        glow: '64,130,174', // Glow color
        innerGlow: '156,229,245', // For inner glow
        outerGlow: '52,109,153', // For outter glow
        text: '#EAECEE', // Primary text
        secondaryText: '#bbbbbb', // Secondary text
        border: '#9FAAB5',     // Border color
        scrollbar: '#0D0D0D',  // Scrollbar color
    },
    fonts: {
        body: "'Fira Sans', sans-serif",
        heading: "'Poppins', sans-serif",
        monospace: "'Courier Prime', monospace",
    },
    fontSizes: {
        xsmall: '1.2rem', // 12px, for less prominent information or captions
        small: '1.4rem', // 14px, suitable for secondary text
        smedium: '1.5rem', // 15px, slightly larger than body text
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