// src/components/projects/modal_buttons/Close.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import CloseImg from '../../../../public/buttons/x.png';

const ButtonContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: ${({ theme }) => theme.buttonSizes.small};
    aspect-ratio: 1/1;
    cursor: pointer;
    margin: 0 10px;
    transition: 0.2s ease-in-out;
`;

const CloseButton = ({ onClick } : { onClick: () => void }) => {
    return (
        <ButtonContainer>
            <Image src={CloseImg} alt="Close modal" onClick={onClick} fill={true} />
        </ButtonContainer>
    );
}

export default CloseButton;