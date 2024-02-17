// src/components/projects/ProjectModal.tsx

import React from 'react';
import styled from 'styled-components';

// Styled container for the project modal
const ProjectModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const ModalContent = styled.div`
    background: ${({ theme }) => theme.colors.secondary};
    height: 100%;
    width: 100%;
    border-radius: 10px;
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