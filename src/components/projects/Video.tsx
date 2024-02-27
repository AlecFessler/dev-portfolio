import React from 'react';
import styled from 'styled-components';

const StyledIframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 10px 10px 0 0;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

interface VideoProps {
    src: string;
}

const Video: React.FC<VideoProps> = ({ src }) => {
    return (
        <StyledIframe src={src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></StyledIframe>
    );
};

export default Video;