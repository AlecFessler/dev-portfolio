// src/components/projects/FlipManager.tsx

import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const FlipManagerContainer = styled.div`
  position: relative;
  perspective: 1000px;
  width: 40rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
`;

interface FlipManagerProps {
  ProjectCard: React.FC;
  ProjectModal: React.FC;
}

const FlipManager: React.FC<FlipManagerProps> = ({ ProjectCard, ProjectModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isFlipped || isFlipping) return;

    if (!isFlipping) {
        containerRef.current.style.transition = 'none'; // Temporarily remove transition for tilt effect
    }

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    // Calculate rotation values based on cursor position
    const rotateX = (y / height) * 25;
    const rotateY = (x / width) * 25 * (y > 0 ? 1 : -1); // Invert the rotation for the lower half

    containerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (containerRef.current && !isFlipped) {
      containerRef.current.style.transition = 'transform 0.6s ease, box-shadow 0.6s ease';
      containerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'; // Reset position
    }
  };

  const onCardClick = () => {
        setIsFlipped(!isFlipped);
        if (containerRef.current && !isFlipped) {
            containerRef.current.style.transition = 'transform 0.6s ease, box-shadow 0.6s ease';
            containerRef.current.style.transform = 'rotateY(180deg)';
            setIsFlipping(true);
        } else if (containerRef.current) {
            containerRef.current.style.transform = 'rotateY(0deg)';
            setTimeout(() => {if(containerRef) {setIsFlipping(false)}}, 600);
        }
  };

  return (
    <FlipManagerContainer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick}
    >
      <ProjectCard />
      <ProjectModal />
    </FlipManagerContainer>
  );
};

export default FlipManager;