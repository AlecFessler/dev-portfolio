// src/components/fun_stuff/MeteorClusterOne.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import MeteorOneImg from '../../../public/meteors/meteor1.png';
import MeteorTwoImg from '../../../public/meteors/meteor2.png';
import MeteorFiveImg from '../../../public/meteors/meteor5.png';
import MeteorSevenImg from '../../../public/meteors/meteor7.png';

const MeteorCluster = styled.div`
    position: absolute;
    z-index: 3;
    perspective: 1000px;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    transform: translateX(7.5%) translateY(50%);
`;

const AnimatedMeteorContainer = styled.div`
    position: absolute;
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

// meteor 4
const MeteorFourWrapper = styled.div`
    position: relative;
    width: 150px;
    height: 150px;

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

const MeteorClusterOne = () => {
    return (
            <MeteorCluster>
                <AnimatedMeteorContainer className="zeroG">
                    <MeteorOneWrapper>
                        <Image src={MeteorOneImg} alt="meteor" height={80} width={80} />
                    </MeteorOneWrapper>
                </AnimatedMeteorContainer>
                <AnimatedMeteorContainer className="zeroG">
                    <MeteorTwoWrapper>
                        <Image src={MeteorTwoImg} alt="meteor" height={100} width={100} />
                    </MeteorTwoWrapper>
                </AnimatedMeteorContainer>
                <AnimatedMeteorContainer className="zeroG">
                    <MeteorThreeWrapper>
                        <Image src={MeteorFiveImg} alt="meteor" height={125} width={125} />
                    </MeteorThreeWrapper>
                </AnimatedMeteorContainer>
                <AnimatedMeteorContainer className="zeroG">
                    <MeteorFourWrapper>
                        <Image src={MeteorSevenImg} alt="meteor" height={150} width={150} />
                    </MeteorFourWrapper>
                </AnimatedMeteorContainer>
            </MeteorCluster>
        );
};

export default MeteorClusterOne;