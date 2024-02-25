// src/components/projects/ProjectModal.tsx

import React from 'react';

import ProjectMediaCarousel from './ProjectMediaCarousel';

interface ProjectModalProps {
    content: React.ReactNode[];
    project: string;
}

const ProjectModal = ({ content, project }: ProjectModalProps) => {
    return (
        <ProjectMediaCarousel content={content} project={project} />
    );
};

export default ProjectModal;