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
`;

const ExitButton = styled.button`
    align-self: flex-end;
    padding: 1rem;
    font-size: 2rem;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: scale(1.1); translateY(-5px);
    }
`;

interface ProjectModalProps {
    content: React.ReactNode[];
    closeModal: () => void;
}

const ProjectModal = ({ content, closeModal }: ProjectModalProps) => {
    return (
        <ProjectModalContainer onClick={closeModal}>
            {/* <ExitButton onClick={closeModal}>X</ExitButton> */}
            <ProjectMediaCarousel content={content} />
        </ProjectModalContainer>
    );
};

export default ProjectModal;