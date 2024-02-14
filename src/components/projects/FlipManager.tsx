// src/components/projects/FlipManager.tsx

import React, { useRef } from 'react';
import styled from 'styled-components';

const FlipManagerContainer = styled.div`
    position: relative;
    perspective: 1000px;
    width: 40rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

interface FlipManagerProps {
    ProjectCard: React.FC;
    ProjectModal: React.FC;
}

const FlipManager: React.FC<FlipManagerProps> = ({ ProjectCard, ProjectModal }) => {
        const cardRef = useRef<HTMLDivElement>(null);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
        
            const { left, top, width, height } = cardRef.current.getBoundingClientRect();
            const x = e.clientX - (left + width / 2);
            const y = e.clientY - (top + height / 2);
        
            // Calculate rotation values based on cursor position
            const rotateX = (y / height) * 20; // Tilt intensity for X remains the same
            const invert = y > 0 ? 1 : -1; // Invert sign for lower half of card
            const rotateY = (x / width) * 20 * invert;
        
            cardRef.current.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseEnter = () => {
        if (!cardRef.current) return;

        cardRef.current.style.transition = 'none'; // Temporarily remove transition for tilt effect
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;

        cardRef.current.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        cardRef.current.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)'; // Reset position
    };
    return (
        <div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FlipManagerContainer>
                <ProjectCard />
                <ProjectModal />
            </FlipManagerContainer>
        </div>
    );
};

export default FlipManager;