// src/components/projects/ProjectModal.tsx

import React from 'react';
import styled from 'styled-components';

import ProjectMediaCarousel from './ProjectMediaCarousel';

// Styled container for the project modal
const ProjectModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const ModalContent = styled.div`
    background: ${({ theme }) => theme.colors.secondary};
    height: 100%;
    width: 100%;
    border-radius: 10px;
`;

interface ProjectModalProps {
    content: React.ReactNode[];
}

const ProjectModal = ({ content }: ProjectModalProps) => {
    console.log("ProjectModal: ", content);
    return (
        <ProjectModalContainer>
            <ModalContent>
                <ProjectMediaCarousel content={content} />
            </ModalContent>
        </ProjectModalContainer>
    );
};

export default ProjectModal;