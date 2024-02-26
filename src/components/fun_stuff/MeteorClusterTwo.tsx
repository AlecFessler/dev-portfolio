// src/components/fun_stuff/MeteorClusterOne.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import MeteorThreeImg from '../../../public/meteors/meteor3.png';
import MeteorFourImg from '../../../public/meteors/meteor4.png';
import MeteorSixImg from '../../../public/meteors/meteor6.png';

const MeteorCluster = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    z-index: 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    transform: translateX(-50px) translateY(-120px) rotateZ(200deg);
    perspective: 1000px;
    transform-style: preserve-3d;
`;

const AnimatedMeteorContainer = styled.div`
    position: relative;
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
    transform: translate3d(-20px, 40px, 0) rotateZ(20deg);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
        transform: translate3d(-225%, -50%, 0);
    }
`;

// meteor 2
const MeteorTwoWrapper = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    transform: translate3d(-50px, 60px, 0) rotateZ(0);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
        transform: translate3d(-225%, -50%, 0);
    }
`;

// meteor 3
const MeteorThreeWrapper = styled.div`
    position: relative;
    width: 125px;
    height: 125px;
    transform: translate3d(-30px, -60px, 0) rotateZ(40deg);

    &:after {
        content: '';
        position: absolute;
        width: 75%;
        height: 75%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        filter: blur(30px);
        transform: translate3d(-225%, -50%, 0);
    }
`;

const MeteorClusterTwo = () => {
    return (
        <MeteorCluster>
            <AnimatedMeteorContainer className="zeroG">
                <MeteorOneWrapper>
                    <Image src={MeteorThreeImg} alt="meteor" height={80} width={80} />
                </MeteorOneWrapper>
            </AnimatedMeteorContainer>
            <AnimatedMeteorContainer className="zeroG">
                <MeteorTwoWrapper>
                    <Image src={MeteorFourImg} alt="meteor" height={100} width={100} />
                </MeteorTwoWrapper>
            </AnimatedMeteorContainer>
            <AnimatedMeteorContainer className="zeroG">
                <MeteorThreeWrapper>
                    <Image src={MeteorSixImg} alt="meteor" height={125} width={125} />
                </MeteorThreeWrapper>
            </AnimatedMeteorContainer>
        </MeteorCluster>
    );
};

export default MeteorClusterTwo;