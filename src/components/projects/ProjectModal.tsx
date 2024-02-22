// src/components/projects/ProjectModal.tsx

import React from 'react';
import styled from 'styled-components';

import ProjectMediaCarousel from './ProjectMediaCarousel';

const ProjectModalContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    background: ${({ theme }) => theme.colors.secondary};
    padding-top: 2rem;
`;

interface ProjectModalProps {
    content: React.ReactNode[];
    closeModal: () => void;
}

const ProjectModal = ({ content, closeModal }: ProjectModalProps) => {
    return (
        <ProjectModalContainer>
            <ProjectMediaCarousel content={content} closeModal={closeModal} />
        </ProjectModalContainer>
    );
};

export default ProjectModal;