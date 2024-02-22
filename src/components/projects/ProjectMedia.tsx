import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import Video from './Video';

const MediaContent = styled.div`
    height: 71.25vh;

    // add breakpoint at 1192px to swap to vw instead of vh
`;

const MediaContainer = styled.div`
    position: relative;
    height: 90%;
    aspect-ratio: 16 / 9;
`;

const MediaCaption = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.5);
    color: ${({ theme }) => theme.colors.text};
    border-radius: 0 0 10px 10px;
    height: 10%;
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
        <MediaContent>
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
        </MediaContent>
    );
};

export default ProjectMedia;