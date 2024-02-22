import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div<{ $width: number; $height: number }>`
    width: ${({ $width }) => `${$width}px`};
    height: ${({ $height }) => `${$height}px`};
    border-radius: 10px;
`;

const StyledIframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 10px 10px 0 0;
`;

interface VideoProps {
    src: string;
    height: number;
    width: number;
}

const Video: React.FC<VideoProps> = ({ src, height, width }) => {
    console.log(height, width);
    return (
        <VideoContainer $width={width} $height={height}>
            <StyledIframe src={src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></StyledIframe>
        </VideoContainer>
    );
};

export default Video;