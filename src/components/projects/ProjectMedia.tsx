import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import Video from './Video';

const ProjectMediaContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
`;

const MediaContent = styled.div`
    background: ${({ theme }) => theme.colors.secondary};
    width: 70%;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
`;

const MediaImage = styled(Image)`
    border-radius: 10px;
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

const MediaCaption = styled.p`
    font-size: 1.5rem;
    text-align: center;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    border-radius: 0 0 10px 10px;
`;

interface ProjectMediaProps {
    image?: StaticImageData;
    video?: string;
    caption: string;
}

const ProjectMedia: React.FC<ProjectMediaProps> = ({ image, video, caption }) => {
    return (
        <ProjectMediaContainer>
            <MediaContent>
                {image ? (
                    <MediaImage src={image} alt={caption} />
                ) : (
                    <Video src={video || ''} />
                )}
                <MediaCaption>{caption}</MediaCaption>
            </MediaContent>
        </ProjectMediaContainer>
    );
};

export default ProjectMedia;

/*
TODO:
- dynamically compute the height and width based on the 16:9 aspect ratio and set in useEffect
- ensure the positioning of elements within the container is correct
- finish styling the carousel controls
*/