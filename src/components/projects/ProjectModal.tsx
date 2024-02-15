// src/components/projects/ProjectModal.tsx

import React from 'react';
import styled from 'styled-components';

interface ProjectModalProps {
    scaleX: number;
    scaleY: number;
}

// Styled container for the project modal
const ProjectModalContainer = styled.div<ProjectModalProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    backface-visibility: hidden;
    transform: rotateY(180deg) scaleX(${props => 1 / props.scaleX}) scaleY(${props => 1 / props.scaleY});
`;

const ProjectModal: React.FC<ProjectModalProps> = ({ scaleX, scaleY }) => {

    
    return (
        <ProjectModalContainer scaleX={scaleX} scaleY={scaleY} >
            <h1>Project Modal</h1>
        </ProjectModalContainer>
    );
};

export default ProjectModal;