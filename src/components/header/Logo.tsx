// src/components/header/Logo.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import LogoImg from '../../../public/logo.png';

const LogoContainer = styled.div`
    position: relative;
    width: clamp(7rem, 10vw, 25rem);
    aspect-ratio: 1 / 1;
`;

const Logo = () => {
    return (
        <LogoContainer>
            <Image src={LogoImg} alt="logo" fill={true} />
        </LogoContainer>
    );
};

export default Logo;