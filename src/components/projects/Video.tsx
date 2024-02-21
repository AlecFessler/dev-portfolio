import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
    position: relative;
    width: 100%; // Container takes full width of its parent
    height: 0; // Initial height is 0 for proper aspect ratio
    padding-top: 56.25%; // This creates an aspect ratio of 16:9 (9 / 16 = 0.5625)
    background: black;
    border-radius: 10px 10px 0 0;
`;

const StyledIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 10px 10px 0 0;
`;

interface VideoProps {
    src: string;
}

const Video: React.FC<VideoProps> = ({ src }) => {
    return (
        <VideoContainer>
            <StyledIframe src={src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></StyledIframe>
        </VideoContainer>
    );
};

export default Video;