import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import Video from './Video';

const MediaContainer = styled.div`
    position: relative;
    width: calc(100vw - 4rem);
    aspect-ratio: 16 / 9;

    @media (min-width: 768px) {
        width: calc(100vw - 10.5rem);
    }
    @media (min-width: 1024px) {
        width: calc(100vw - 20.25rem);
    }
    @media (min-width: 1440px) {
        width: calc(100vw - 60rem);
    }
    @media (min-width: 1920px) {
        width: calc(100vw - 70.5rem);
    }
    @media (min-width: 2560px) {
        width: calc(100vw - 79.5rem);
    }
`;

const MediaCaption = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    padding: 5px;

    @media (min-width: 375px) {
        padding: 7.5px;
    }
    @media (min-width: 425px) {
        font-size: ${({ theme }) => theme.fontSizes.small};
        padding: 10px;
    }
    @media (min-width: 1440px) {
        font-size: ${({ theme }) => theme.fontSizes.regular};
        padding: 15px;
    }
    @media (min-width: 1920px) {
        font-size: ${({ theme }) => theme.fontSizes.xlarge};
        padding: 20px;
    }
    @media (min-width: 2560px) {
        font-size: ${({ theme }) => theme.fontSizes.xxlarge};
        padding: 25px;
    }
`;

interface ProjectMediaProps {
    image?: StaticImageData;
    video?: string;
    caption: string;
    width: number;
    height: number;
}

const ProjectMedia: React.FC<ProjectMediaProps> = ({ image, video, caption }) => {

    return (
        <>
            {image ? (
                <MediaContainer>
                    <Image 
                        src={image}
                        alt={caption}
                        fill={true}
                        style={{ borderRadius: '10px 10px 0 0' }} />
                </MediaContainer>

            ) : (
                <MediaContainer>
                    <Video src={video || ''} />
                </MediaContainer>
            )}
            <MediaCaption>{caption}</MediaCaption>
        </>
    );
};

export default ProjectMedia;