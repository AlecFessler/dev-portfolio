// src/components/projects/GifContainer.tsx

import React from 'react';
import styled from 'styled-components';
import { StaticImageData } from 'next/image';

const GifContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const Gif = styled.img`
    height: 100%;
`;

interface Props {
    srcOne: StaticImageData;
    altOne: string;
    srcTwo: StaticImageData;
    altTwo: string;
    srcThree: StaticImageData;
    altThree: string;
}

const GifContainerComponent: React.FC<Props> = ({ srcOne, altOne, srcTwo, altTwo, srcThree, altThree }) => {
    return (
        <GifContainer>
            <Gif src={srcOne.src} alt={altOne} />
            <Gif src={srcTwo.src} alt={altTwo} />
            <Gif src={srcThree.src} alt={altThree} />
        </GifContainer>
    );
};

export default GifContainerComponent;
