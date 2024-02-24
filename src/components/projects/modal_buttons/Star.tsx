// src/components/projects/modal_buttons/Star.tsx

import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
    transform-style: preserve-3d;
    height: ${({ theme }) => theme.buttonSizes.small};
`;

const AbsoluteContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
`;

interface StarProps {
    onClick: () => void;
    fill: string;
    stroke: string;
}

const StarSVG = ({ fill, stroke }: { fill: string, stroke: string }) => {
    return (
        <svg id="shape" height="100%" viewBox="0 0 512 512" width="100%" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="m256.001 505c-3.227 0-5.876-2.553-5.997-5.777-.022-.602-2.463-60.834-21.167-120.126-24.51-77.7-63.82-117.097-116.837-117.097-3.313 0-6-2.687-6-6s2.687-6 6-6c53.066 0 92.398-39.466 116.902-117.302 18.667-59.292 21.08-119.321 21.102-119.92.12-3.225 2.768-5.777 5.995-5.777s5.876 2.552 5.997 5.776c.022.602 2.463 60.835 21.167 120.127 24.51 77.699 63.82 117.096 116.837 117.096 3.313 0 6 2.687 6 6s-2.687 6-6 6c-53.066 0-92.398 39.466-116.902 117.302-18.666 59.293-21.079 119.321-21.102 119.92-.12 3.225-2.768 5.777-5.995 5.778zm-108.229-249c17.884 6.35 34.013 17.722 48.207 34.029 18.088 20.782 33.016 49.605 44.369 85.669 7.492 23.8 12.421 47.434 15.652 67.539 3.23-20.105 8.159-43.739 15.652-67.539 11.354-36.063 26.281-64.887 44.369-85.669 14.193-16.308 30.322-27.68 48.207-34.029-17.885-6.35-34.014-17.722-48.207-34.03-18.088-20.782-33.016-49.604-44.369-85.668-7.493-23.799-12.422-47.434-15.652-67.539-3.23 20.105-8.16 43.739-15.652 67.539-11.354 36.064-26.281 64.887-44.369 85.668-14.194 16.308-30.323 27.68-48.207 34.03z" 
                fill={fill} 
                stroke={stroke} 
            />
        </svg>
    );
}

const Star: React.FC<StarProps> = ({ onClick, fill, stroke }) => {
    return (
        <ButtonContainer onClick={onClick} >
            <StarSVG fill={fill} stroke={stroke} />
            <AbsoluteContainer>
                <StarSVG fill={fill} stroke={stroke} />
            </AbsoluteContainer>
        </ButtonContainer>
    );
}

export default Star;