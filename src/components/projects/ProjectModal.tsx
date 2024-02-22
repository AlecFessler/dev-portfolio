// src/components/projects/ProjectModal.tsx

import React from 'react';

import ProjectMediaCarousel from './ProjectMediaCarousel';

interface ProjectModalProps {
    content: React.ReactNode[];
    closeModal: () => void;
}

const ProjectModal = ({ content, closeModal }: ProjectModalProps) => {
    return (
        <ProjectMediaCarousel content={content} closeModal={closeModal} />
    );
};

export default ProjectModal;