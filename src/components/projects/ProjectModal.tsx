// src/components/projects/ProjectModal.tsx

import React from 'react';
import styled from 'styled-components';

import ProjectMediaCarousel from './ProjectMediaCarousel';

const ProjectModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
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
    margin: 1rem;
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

const ModalContent = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 10px;
`;

interface ProjectModalProps {
    content: React.ReactNode[];
    closeModal: () => void;
}

const ProjectModal = ({ content, closeModal }: ProjectModalProps) => {
    return (
        <ProjectModalContainer>
            <ExitButton onClick={closeModal}>X</ExitButton>
            <ModalContent>
                <ProjectMediaCarousel content={content} />
            </ModalContent>
        </ProjectModalContainer>
    );
};

export default ProjectModal;