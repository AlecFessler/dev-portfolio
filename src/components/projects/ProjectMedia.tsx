// src/componets/projects/ProjectMedia.tsx

import React from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

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

const MediaImage = styled(Image)`
    border-radius: 10px;
`;

const MediaVideo = styled.video`
    border-radius: 10px;
`;

const MediaCaption = styled.p`
    font-size: 1.5rem;
    text-align: left;
`;

interface ProjectMediaProps {
    image?: StaticImageData;
    video?: string;
    caption: string;
}

const ProjectMedia: React.FC<ProjectMediaProps> = ({ image, video, caption }) => {

    console.log(video);

    return (
        <ProjectMediaContainer>
            <MediaContent>
                {image ? <MediaImage src={image} alt={caption} width={160} height={90} /> : 
                         <MediaVideo controls muted>
                            <source src={video} type="video/mp4" />
                            Your browser does not support video.
                         </MediaVideo>}
                <MediaCaption>{caption}</MediaCaption>
            </MediaContent>
        </ProjectMediaContainer>
    );
};

export default ProjectMedia;