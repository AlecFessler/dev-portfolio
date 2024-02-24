// src/components/header/Logo.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import LogoImg from '../../../public/logo.png';

const LogoContainer = styled.div`
    position: relative;
    min-width: 120px;
    max-width: 120px;
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