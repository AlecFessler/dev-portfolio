// src/components/fun_stuff/MeteorClusterOne.tsx

import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Image from 'next/image';

import MeteorOneImg from '../../../public/meteors/meteor1.png';
import MeteorTwoImg from '../../../public/meteors/meteor2.png';
import MeteorFiveImg from '../../../public/meteors/meteor5.png';
import MeteorSevenImg from '../../../public/meteors/meteor7.png';

const MeteorCluster = styled.div`
    position: absolute;
    top: 57.5%;
    left: 5%;
    z-index: 3;
    perspective: 1000px;
    transform-style: preserve-3d;
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
    width: 8rem;
    height: 8rem;
    transform: translateX(12.5rem) translateY(2rem) rotateZ(30deg);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
    }
`;

// meteor 2
const MeteorTwoWrapper = styled.div`
    position: relative;
    width: 10rem
    height: 10rem;
    transform: translateY(2.5rem) rotateZ(-5deg);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
    }
`;

// meteor 3
const MeteorThreeWrapper = styled.div`
    position: relative;
    width: 12.5rem;
    height: 12.5rem;
    transform: translateX(-5rem) translateY(17.5rem) rotateZ(30deg);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
    }
`;

// meteor 4
const MeteorFourWrapper = styled.div`
    position: relative;
    width: 15rem;
    height: 15rem;
    transform: translateY(7.5rem) rotateZ(20deg);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
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

const MeteorClusterOne = () => {
    return (
            <MeteorCluster>
                <UniqueAnimatedMeteor>
                    <MeteorOneWrapper>
                        <Image src={MeteorOneImg} alt="meteor" height={80} width={80} />
                    </MeteorOneWrapper>
                </UniqueAnimatedMeteor>
                <UniqueAnimatedMeteor>
                    <MeteorTwoWrapper>
                        <Image src={MeteorTwoImg} alt="meteor" height={100} width={100} />
                    </MeteorTwoWrapper>
                </UniqueAnimatedMeteor>
                <UniqueAnimatedMeteor>
                    <MeteorThreeWrapper>
                        <Image src={MeteorFiveImg} alt="meteor" height={125} width={125} />
                    </MeteorThreeWrapper>
                </UniqueAnimatedMeteor>
                <UniqueAnimatedMeteor>
                    <MeteorFourWrapper>
                        <Image src={MeteorSevenImg} alt="meteor" height={150} width={150} />
                    </MeteorFourWrapper>
                </UniqueAnimatedMeteor>
            </MeteorCluster>
        );
};

export default MeteorClusterOne;