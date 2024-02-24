// src/components/projects/modal_buttons/Next.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import NextImg from '../../../../public/buttons/next.png';
import NextImg2 from '../../../../public/buttons/next2.png';

const ButtonContainer = styled.div<{ $side: 'left' | 'right' }>`
    position: relative;
    width: 100%;
    max-width: ${({ theme }) => theme.buttonSizes.small};
    aspect-ratio: 1/1;
    cursor: pointer;
    margin: 0 10px;
    transform: ${({ $side }) => $side === 'left' ? 'rotateZ(-90deg)' : 'rotateX(180deg) rotateZ(90deg)'};
`;

const NexButton = ({ onClick, side }: { onClick: () => void; side: 'left' | 'right' }) => {
    return (
        <ButtonContainer $side={side} onClick={onClick}>
            {side === 'left' ? <Image src={NextImg} alt="previous media" layout="fill" /> : <Image src={NextImg2} alt="next media" layout="fill" />}
        </ButtonContainer>
    );
};

export default NexButton;