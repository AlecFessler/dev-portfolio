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
    bottom: 0;
    width: 300px;
    height: 300px;
    z-index: 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    transform: translateY(60%) rotateZ(30deg);
    visibility: hidden;
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
    transform: translate3d(-10px, 35px, 0) rotateZ(-30deg);

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
    transform: translate3d(-70px, 0, 0) rotateZ(-10deg);

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
    transform: translate3d(40px, 15px, 0) rotateZ(15deg);

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
    transform: translate3d(-125px, -100px, 0);

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