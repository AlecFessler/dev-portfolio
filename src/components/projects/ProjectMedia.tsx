// src/componets/projects/ProjectMedia.tsx

import { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const ProjectMediaContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const MediaContent = styled.div`
    background: ${({ theme }) => theme.colors.secondary};
    height: 100%;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const MediaImage = styled.img`
    border-radius: 10px;
    margin-bottom: 1rem;
    width: 100%;
    height: auto;
`;

const MediaVideo = styled.video`
    border-radius: 10px;
    margin-bottom: 1rem;
    width: 100%;
    height: auto;
`;

const MediaCaption = styled.p`
    font-size: 1.5rem;
    text-align: left;
`;

interface ProjectMediaProps {
    image?: string;
    video?: string;
    caption: string;
}

const ProjectMedia: React.FC<ProjectMediaProps> = ({ image, video, caption }) => {
    const [isImage, setIsImage] = useState(true);

    if (!image && !video) {
        return null;
    } else if (!image) {
        setIsImage(false);
    }

    return (
        <ProjectMediaContainer>
            <MediaContent>
                {isImage ? <MediaImage src={image} alt={caption} /> : <MediaVideo src={video} autoPlay loop muted />}
                <MediaCaption>{caption}</MediaCaption>
            </MediaContent>
        </ProjectMediaContainer>
    );
};

export default ProjectMedia;