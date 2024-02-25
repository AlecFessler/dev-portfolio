// src/components/projects/modal_buttons/Close.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import CloseImg from '../../../../public/buttons/x.png';

const ButtonContainer = styled.div<{ $modalActive: boolean }>`
    position: relative;
    width: 100%;
    max-width: ${({ theme }) => theme.buttonSizes.small};
    aspect-ratio: 1/1;
    cursor: pointer;
    margin: 0 10px;
    transition: 0.2s ease-in-out;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        z-index: 1;
        transition: 0.2s ease-in-out;
        background-color: ${({ theme }) => theme.colors.background};
        
        @keyframes fadeOut {
            from {opacity: 1;}
            to {opacity: 0;}
        }

        animation: ${({ $modalActive }) => $modalActive ? 'fadeOut 0.15s ease-in-out forwards' : 'none'};
    }
`;

const CloseButton = ({ onClick, modalActive } : { onClick: () => void; modalActive: boolean }) => {
    return (
        <ButtonContainer $modalActive={modalActive} onClick={onClick}>
            <Image src={CloseImg} alt="Close modal" fill={true} />
        </ButtonContainer>
    );
}

export default CloseButton;