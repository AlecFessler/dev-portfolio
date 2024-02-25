// src/components/projects/modal_buttons/Next.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import NextImg from '../../../../public/buttons/next.png';
import NextImg2 from '../../../../public/buttons/next2.png';

const ButtonContainer = styled.div<{ $side: 'left' | 'right'; $modalActive: boolean }>`
    position: relative;
    width: 100%;
    max-width: ${({ theme }) => theme.buttonSizes.small};
    aspect-ratio: 1/1;
    cursor: pointer;
    margin: 0 10px;
    transform: ${({ $side }) => $side === 'left' ? 'rotateZ(-90deg)' : 'rotateX(180deg) rotateZ(90deg)'};

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        z-index: 1;
        background-color: ${({ theme }) => theme.colors.background};
        
        @keyframes fadeOut {
            from {opacity: 1;}
            to {opacity: 0;}
        }

        animation: ${({ $modalActive }) => $modalActive ? 'fadeOut 0.15s ease-in-out forwards' : 'none'};
    }
`;

const NexButton = ({ onClick, side, modalActive }: { onClick: () => void; side: 'left' | 'right'; modalActive: boolean }) => {
    return (
        <ButtonContainer $side={side} onClick={onClick} $modalActive={modalActive}>
            {side === 'left' ? <Image src={NextImg} alt="previous media" fill={true} /> : <Image src={NextImg2} alt="next media" fill={true} />}
        </ButtonContainer>
    );
};

export default NexButton;