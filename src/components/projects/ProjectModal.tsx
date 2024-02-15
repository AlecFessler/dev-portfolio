// src/components/projects/ProjectModal.tsx

import React from 'react';
import styled from 'styled-components';

// Styled container for the project modal
const ProjectModalContainer = styled.div`
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
    transform: rotateY(180deg);
`;

const ModalContent = styled.div`
    background: ${({ theme }) => theme.colors.secondary};
    height: 100%;
    width: 100%;
`;

const ProjectModal = () => {
    
    return (
        <ProjectModalContainer>
            <ModalContent>
                <h1>Project Modal</h1>
            </ModalContent>
        </ProjectModalContainer>
    );
};

export default ProjectModal;