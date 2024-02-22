import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import Video from './Video';

const MediaContainer = styled.div`
    position: relative;
    width: 55vw;
    aspect-ratio: 16 / 9;
    @media (max-width: 600px) {
        width: calc(100vw - 4rem);
    }
    @media (min-width: 601px) {
    }
    @media (min-width: 768px) {
    }
    @media (min-width: 1024px) {
    }
    @media (min-width: 1440px) {
    }
    @media (min-width: 2560px) {
    }
`;

const MediaCaption = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.5);
    color: ${({ theme }) => theme.colors.text};
    border-radius: 0 0 10px 10px;
    padding: 10px;
    @media (max-width: 600px) {
        font-size: 1rem;
        border-radius: 0;
    }
    @media (min-width: 601px) {
    }
    @media (min-width: 768px) {
    }
    @media (min-width: 1024px) {
    }
    @media (min-width: 1440px) {
    }
    @media (min-width: 2560px) {
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