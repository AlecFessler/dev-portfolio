// src/components/sections/Hello.tsx

import React, { useContext } from 'react';
import { styled } from 'styled-components';

import FlippedContext from '../../state/FlippedContext';

const StyledSection = styled.section`
    height: 105vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    margin: 0 auto;

    @media (min-width: 425px) {
        padding: 0 4rem;
    }
    @media (min-width: 768px) {
        padding: 0;
        width: 59%;
    }
    @media (min-width: 1024px) {
        width: 44%;
    }
    @media (min-width: 1440px) {
        width: 39%;
    }
    @media (min-width: 1920px) {
        width: 35%;
    }
    @media (min-width: 2560px) {
        width: 33%;
    }

    &.fadeOut {
        animation: fadeOut 0.6s forwards;
    }

    &.fadeIn {
        animation: fadeIn 0.6s forwards;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform-style: preserve-3d;
    border-radius: 10px;
`;

const GreetingText = styled.h1`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
    margin-bottom: 4rem;
    letter-spacing: -1.5px;

    @media (min-width: 425px) {
        font-size: calc(${({ theme }) => theme.fontSizes.xxlarge} + 0.5rem);
    }
    @media (min-width: 768px) {
        font-size: calc(${({ theme }) => theme.fontSizes.xxxlarge} + 0.5rem);
    }
    @media (min-width: 1440px) {
        font-size: calc(${({ theme }) => theme.fontSizes.huge} + 0.5rem);
    }
    @media (min-width: 1920px) {
        font-size: calc${({ theme }) => theme.fontSizes.xhuge} + 0.5rem);
    }
    @media (min-width: 2560px) {
        font-size: calc${({ theme }) => theme.fontSizes.xxhuge} + 0.5rem);
    }
`;

const StatementText = styled.h1`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    letter-spacing: -1.5px;

    @media (min-width: 425px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxlarge};
    }
    @media (min-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.huge};
    }
    @media (min-width: 1440px) {
        font-size: ${({ theme }) => theme.fontSizes.xhuge};
    }
    @media (min-width: 1920px) {
        font-size: ${({ theme }) => theme.fontSizes.xxhuge};
    }
    @media (min-width: 2560px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxhuge};
    }
`;

const Highlight = styled.span<{ $top: boolean }>`
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    display: inline;

    @keyframes glow {
        0% {
            text-shadow: 0 0 30px rgba(${({ theme }) => theme.colors.outerGlow}, 0.1), 0 0 20px rgba(${({ theme }) => theme.colors.glow}, 0.2), 0 0 10px rgba(${({ theme }) => theme.colors.innerGlow}, 0.3);
        }
        50% {
            text-shadow: 0 0 30px rgba(${({ theme }) => theme.colors.outerGlow}, 0.4), 0 0 20px rgba(${({ theme }) => theme.colors.glow}, 0.5), 0 0 10px rgba(${({ theme }) => theme.colors.innerGlow}, 0.6);
        }
        100% {
            text-shadow: 0 0 30px rgba(${({ theme }) => theme.colors.outerGlow}, 0.1), 0 0 20px rgba(${({ theme }) => theme.colors.glow}, 0.2), 0 0 10px rgba(${({ theme }) => theme.colors.innerGlow}, 0.3);
        }
    }

    @keyframes oscillateBrightness {
        0% {
            opacity: 0.4;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.4;
        }
    }

    animation: glow 3s infinite linear;

    &:after {
        content: '';
        position: absolute;
        top: ${({ $top }) => $top ? '60%' : '80%'};
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse at center, rgba(${({ theme }) => theme.colors.innerGlow}, 0.6) 0%, rgba(${({ theme }) => theme.colors.glow}, 0.6) 33%, rgba(${({ theme }) => theme.colors.outerGlow}, 0.6) 66%);
        transform: perspective(200px) rotateX(80deg);
        filter: blur(40px);
        animation: oscillateBrightness 3s infinite linear;
    }
`;

{/*const Definition = styled.h2`
    font-family: ${({ theme }) => theme.fonts.monospace};
    max-width: 100%;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.regular};

    @media (min-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.large};
    }
    @media (min-width: 1024px) {
        font-size: ${({ theme }) => theme.fontSizes.xlarge};
    }
    @media (min-width: 1920px) {
        font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    }
    @media (min-width: 2560px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxlarge};
    }
`;*/}

const Hello = () => {
  const { flipped, firstFlip } = useContext(FlippedContext);

  return (
    <StyledSection id="Hello" className={firstFlip ? '' : flipped ? 'fadeOut' : 'fadeIn'}>
        <TextContainer>
            <GreetingText>
                Hello, I'm <Highlight $top={true}>Alec</Highlight>.
            </GreetingText>
            <StatementText>
                I'm a <Highlight $top={false}>programmer</Highlight>.
            </StatementText>
            {/*<Definition>
                pro·gram·mer<br />
                /`prōˌgramər/<br />
                noun<br />
                a lifelong learner, driven by insatiable curiosity and a passion for problem-solving.
            </Definition>*/}
        </TextContainer>
    </StyledSection>
  );
};

export default Hello;