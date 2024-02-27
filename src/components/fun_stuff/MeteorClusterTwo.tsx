// src/components/fun_stuff/MeteorClusterOne.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import MeteorThreeImg from '../../../public/meteors/meteor3.png';
import MeteorFourImg from '../../../public/meteors/meteor4.png';
import MeteorSixImg from '../../../public/meteors/meteor6.png';

const MeteorCluster = styled.div`
    position: absolute;
    z-index: 3;
    perspective: 1000px;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    transform: translateX(-7.5%) translateY(35%);
`;

const AnimatedMeteorContainer = styled.div`
    position: absolute;
    right: 0;
    min-width: 80px;
    max-width: 150px;
    aspect-ratio: 1 / 1;

    @keyframes zeroG {
        0% {
            transform: translate3d(0, 0, 0) rotateZ(0);
        }
        10% {
            transform: translate3d(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 11) - 5}px, 0) rotateZ(${Math.floor(Math.random() * 21) - 10}deg);
        }
        20% {
            transform: translate3d(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 11) - 5}px, 0) rotateZ(${Math.floor(Math.random() * 21) - 10}deg);
        }
        30% {
            transform: translate3d(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 11) - 5}px, 0) rotateZ(${Math.floor(Math.random() * 21) - 10}deg);
        }
        40% {
            transform: translate3d(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 11) - 5}px, 0) rotateZ(${Math.floor(Math.random() * 21) - 10}deg);
        }
        50% {
            transform: translate3d(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 11) - 5}px, 0) rotateZ(${Math.floor(Math.random() * 21) - 10}deg);
        }
        60% {
            transform: translate3d(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 11) - 5}px, 0) rotateZ(${Math.floor(Math.random() * 21) - 10}deg);
        }
        70% {
            transform: translate3d(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 11) - 5}px, 0) rotateZ(${Math.floor(Math.random() * 21) - 10}deg);
        }
        80% {
            transform: translate3d(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 11) - 5}px, 0) rotateZ(${Math.floor(Math.random() * 21) - 10}deg);
        }
        90% {
            transform: translate3d(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 11) - 5}px, 0) rotateZ(${Math.floor(Math.random() * 21) - 10}deg);
        }

        100% {
            transform: translate3d(0, 0, 0) rotateZ(0);
        }
    }

    &.zeroG {
        animation: zeroG 60s infinite linear;
    }
`;

// meteor 1
const MeteorOneWrapper = styled.div`
    position: relative;
    width: 80px;
    height: 80px;

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
    width: 100px;
    height: 100px;

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
    width: 125px;
    height: 125px;

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

const MeteorClusterTwo = () => {
    return (
        <MeteorCluster>
            <AnimatedMeteorContainer className="zeroG">
                <MeteorOneWrapper>
                    <Image src={MeteorThreeImg} alt="meteor" height={80} width={80} objectFit='cover' />
                </MeteorOneWrapper>
            </AnimatedMeteorContainer>
            <AnimatedMeteorContainer className="zeroG">
                <MeteorTwoWrapper>
                    <Image src={MeteorFourImg} alt="meteor" height={100} width={100} objectFit='cover' />
                </MeteorTwoWrapper>
            </AnimatedMeteorContainer>
            <AnimatedMeteorContainer className="zeroG">
                <MeteorThreeWrapper>
                    <Image src={MeteorSixImg} alt="meteor" height={125} width={125} objectFit='cover' />
                </MeteorThreeWrapper>
            </AnimatedMeteorContainer>
        </MeteorCluster>
    );
};


export default MeteorClusterTwo;