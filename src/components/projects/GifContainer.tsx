// src/components/projects/GifContainer.tsx

import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

const GifContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

const Gif = styled(Image)`
    height: 100%;
    width: 100%;
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
            <Gif src={srcOne} alt={altOne} />
            <Gif src={srcTwo} alt={altTwo} />
            <Gif src={srcThree} alt={altThree} />
        </GifContainer>
    );
};

export default GifContainerComponent;