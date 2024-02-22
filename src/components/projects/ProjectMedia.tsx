import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import Video from './Video';

/*
Sizing the media content is done through the combination of relative dimensions and aspect-ratio.
The media content container is given a relative height of 90%, so that it's sibling buttons (in the carousel)
can occupy the remaining 10% of the container's height. The aspect-ratio property ensures that for every 16
pixels of width, there are 10 pixels of height. The media content itself will always have a 16:9 aspect ratio,
thus taking up 100% of the width, but only 90% of the height. The caption is given the remaining 10% of the
height. The parent containers 16:10 aspect ratio is crucial to ensure the media content can maintain it's
16:9 ratio while still providing space for the caption.
*/

const MediaContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    max-width: 100%;
    aspect-ratio: 16 / 10;
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
`;

const MediaContainer = styled.div`
    position: relative;
    max-width: 100%;
    height: 90%;
    border-radius: 10px 10px 0 0;
    aspect-ratio: 16 / 9;
`;

const MediaCaption = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 1rem;
    border-radius: 0 0 10px 10px;
    width: 100%;
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
    const mediaContainerRef = useRef<HTMLDivElement>(null);
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (mediaContainerRef.current) {
                setContainerDimensions({
                    width: mediaContainerRef.current.offsetWidth,
                    height: mediaContainerRef.current.offsetHeight,
                });
            }
        };
        handleResize(); // initialize dimensions
        setRendered(true);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <MediaContent>
            {image ? (
                <MediaContainer ref={mediaContainerRef}>
                    {mediaContainerRef.current && <Image 
                        src={image}
                        alt={caption} 
                        width={containerDimensions.width}
                        height={containerDimensions.height}
                        style={{ borderRadius: '10px 10px 0 0' }} />}
                </MediaContainer>

            ) : (
                <MediaContainer ref={mediaContainerRef}>
                    <Video src={video || ''} {...containerDimensions} />
                </MediaContainer>
            )}
            <MediaCaption>{caption}</MediaCaption>
        </MediaContent>
    );
};

export default ProjectMedia;

/*
TODO: 
- make mobile responsive
- add nice images for buttons
- adjust the way that dimensions are calculated to implicitly use the aspect ratio and apply correct padding
*/