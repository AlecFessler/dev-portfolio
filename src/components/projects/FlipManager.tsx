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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isFlipped) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    // Calculate rotation values based on cursor position
    const rotateX = (y / height) * 25;
    const rotateY = (x / width) * 25 * (y > 0 ? 1 : -1); // Invert the rotation for the lower half

    containerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseEnter = () => {
    if (containerRef.current && !isFlipped) {
      containerRef.current.style.transition = 'none'; // Temporarily remove transition for tilt effect
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current && !isFlipped) {
      containerRef.current.style.transition = 'transform 0.6s ease, box-shadow 0.6s ease';
      containerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'; // Reset position
    }
  };

  const onCardClick = () => {
        setIsFlipped(!isFlipped); // Toggle the flipped state
        if (containerRef.current && !isFlipped) {
            containerRef.current.style.transition = 'transform 0.6s ease, box-shadow 0.6s ease';
            containerRef.current.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
        } else if (containerRef.current) {
            containerRef.current.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
        }
  };

  return (
    <FlipManagerContainer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick} // Attach the click event handler here for flip
    >
      <ProjectCard />
      <ProjectModal />
    </FlipManagerContainer>
  );
};

export default FlipManager;