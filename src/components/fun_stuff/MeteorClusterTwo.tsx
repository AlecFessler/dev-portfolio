// src/components/fun_stuff/MeteorClusterOne.tsx

import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Image from 'next/image';

import MeteorThreeImg from '../../../public/meteors/meteor3.png';
import MeteorFourImg from '../../../public/meteors/meteor4.png';
import MeteorSixImg from '../../../public/meteors/meteor6.png';

const MeteorCluster = styled.div`
    position: absolute;
    top: 37.5%;
    right: 5%;
    z-index: 3;
    perspective: 1000px;
    transform-style: preserve-3d;
    transform: rotateZ(180deg);
`;

const AnimatedMeteorContainer = styled.div<{ $animation: ReturnType<typeof keyframes> }>`
    position: absolute;
    min-width: 8rem;
    max-width: 15rem;
    width: 100%;
    aspect-ratio: 1 / 1;

    ${(props) => css`
        animation: ${props.$animation} 60s infinite;
    `}
    }
`;

// meteor 1
const MeteorOneWrapper = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    transform: translateX(10rem) translateY(-10rem) rotateZ(25deg);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
        transform: translateX(-15rem) translateY(-10rem);
    }
`;

// meteor 2
const MeteorTwoWrapper = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    transform: translateX(-2.5rem) translateY(-12.5rem) rotateZ(-15deg);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
        transform: translateX(-15rem) translateY(-10rem);
    }
`;

// meteor 3
const MeteorThreeWrapper = styled.div`
    position: relative;
    width: 125px;
    height: 125px;
    transform: translateY(-5rem) rotateZ(20deg);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
        transform: translateX(-15em) translateY(-10rem);
    }
`;

const generateUniqueKeyframes = () => {
    const randomValue = () => Math.floor(Math.random() * 11) - 5;
    const randomDegree = () => Math.floor(Math.random() * 21) - 10;
  
    // Generating unique keyframes as string
    const keyframesString = `
      0% {
        transform: translate3d(0, 0, 0) rotateZ(0);
      }
      ${Array.from({ length: 10 }).map((_, index) => `
        ${index * 10}% {
          transform: translate3d(${randomValue()}px, ${randomValue()}px, 0) rotateZ(${randomDegree()}deg);
        }
      `).join('')}
      100% {
        transform: translate3d(0, 0, 0) rotateZ(0);
      }
    `;
  
    // Using the keyframes helper to create a unique animation
    return keyframes`${keyframesString}`;
};

const UniqueAnimatedMeteor = ({ children } : { children: React.ReactNode }) => {
    const zeroGKeyframes = generateUniqueKeyframes();
    
    return (
        <AnimatedMeteorContainer className="zeroG" $animation={zeroGKeyframes}>
            {children}
        </AnimatedMeteorContainer>
    );
};

const MeteorClusterTwo = () => {
    return (
        <MeteorCluster>
            <UniqueAnimatedMeteor>
                <MeteorOneWrapper>
                    <Image src={MeteorThreeImg} alt="meteor" height={80} width={80} />
                </MeteorOneWrapper>
            </UniqueAnimatedMeteor>
            <UniqueAnimatedMeteor>
                <MeteorTwoWrapper>
                    <Image src={MeteorFourImg} alt="meteor" height={100} width={100} />
                </MeteorTwoWrapper>
            </UniqueAnimatedMeteor>
            <UniqueAnimatedMeteor>
                <MeteorThreeWrapper>
                    <Image src={MeteorSixImg} alt="meteor" height={125} width={125} />
                </MeteorThreeWrapper>
            </UniqueAnimatedMeteor>
        </MeteorCluster>
    );
};


export default MeteorClusterTwo;