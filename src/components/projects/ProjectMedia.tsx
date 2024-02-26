// src/components/projects/ProjectMedia.tsx

import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import Video from './Video';

const MediaContainer = styled.div`
    position: relative;
    display: flex;
    width: calc(100vw - 4rem);
    aspect-ratio: 16 / 9;
    transform-style: preserve-3d;
    border-radius: 10px;

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

const InsetShadowLayer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 10px 5px rgba(0, 0, 0, 0.6);
    z-index: 3;
    border-radius: 10px 10px 0 0;
    background-color: rgba(0, 0, 0, 0.1);
`;

const MediaCaptionContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 0 0 10px 10px;
`;

const MediaCaption = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(${({ theme }) => theme.colors.shadedContainer});
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    font-family: ${({ theme }) => theme.fonts.body};
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
                    <InsetShadowLayer />
                    <Image 
                        src={image}
                        alt={caption}
                        fill={true} 
                        style={{borderRadius: '10px 10px 0 0'}} />
                </MediaContainer>

            ) : (
                <MediaContainer>
                    <InsetShadowLayer />
                    <Video src={video || ''} />
                </MediaContainer>
            )}
            <MediaCaptionContainer>
                <MediaCaption>{caption}</MediaCaption>
            </MediaCaptionContainer>
        </>
    );
};

export default ProjectMedia;