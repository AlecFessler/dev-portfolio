// src/components/projects/ProjectMedia.tsx

import React from 'react';
import styled from 'styled-components';

import ProjectCard from '../projects/ProjectCard';
import ProjectModal from '../projects/ProjectModal';
import FlipManager from '../projects/FlipManager';
import ProjectMedia from '../projects/ProjectMedia';
import GifContainerComponent from '../projects/GifContainer';

import BarbellImg from '../../../public/project_cards/barbell.png';
import PaintingImg from '../../../public/project_cards/painting.png';
import CircuitImg from '../../../public/project_cards/circuit.png';
import TypewriterImg from '../../../public/project_cards/typewriter.png';
import BedframeImg from '../../../public/project_cards/bedframe.png';
import AsciiImg from '../../../public/project_cards/ascii.png';

// Level up exercise log
import LevelUpLog from '../../../public/projects/level_up/log.gif';
import LevelUpPR from '../../../public/projects/level_up/personal-record.gif';
import LevelUpStats from '../../../public/projects/level_up/stats.gif';
import LevelUpLogin from '../../../public/projects/level_up/login.gif';
import LevelUpCalendar from '../../../public/projects/level_up/calendar.gif';
import LevelUpDelete from '../../../public/projects/level_up/delete-ui.gif';

// Fesslerpainting.com
import FesslerPaintingDesktop from '../../../public/projects/fessler_painting/fessler-painting-page.png';
import FesslerPaintingMobile from '../../../public/projects/fessler_painting/fessler-painting-mobile.png';
import FesslerPaintingReviews from '../../../public/projects/fessler_painting/fessler-painting-reviews.png';

// Turing Complete CPU
import CpuCircuit from '../../../public/projects/turing_complete/cpu_circuit.png';
const MazeVideo = 'https://www.youtube.com/embed/E4nXSWYnsjw?rel=0';
const MultipicationVideo = 'https://www.youtube.com/embed/yb0OvjXuftM?rel=0';

// Interactive Story Writer
// animated diagram video

// Bedframe
const LedVideo = 'https://www.youtube.com/embed/mskFpDB3tDQ?rel=0';
import Blueprints from '../../../public/projects/bedframe/diagram.png';
import BedConstruction from '../../../public/projects/bedframe/bed_construction.png';
import LEDCircuit from '../../../public/projects/bedframe/led_circuit.png';

// ASCII Art Generator
// animated diagram video
// artwork examples

const ProjectsSection = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 3rem;
    align-items: stretch;
    grid-auto-rows: 1fr;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    padding: 0 3rem;

    @media (min-width: 425px) {
        padding: 0 4rem;
        gap: 4rem;
    }
    @media (min-width: 768px) {
        padding: 0 5rem;
        gap: 5rem;
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
        padding: 0 10rem;
        gap: 10rem;
    }
    @media (min-width: 1440px) {
        padding: 0 30rem;
        gap: 12.5rem;
    }
    @media (min-width: 1920px) {
        padding: 0 35rem;
        gap: 17.5rem;
    }
    @media (min-width: 2560px) {
        padding: 0 40rem;
        gap: 20rem;
    }
`;

const Projects = () => {
    const projectCards = [
        {
            image: BarbellImg,
            title: "Level Up Exercise Log",
            description: "Level Up Exercise Log, my first significant coding project, initiated in 2020, transforms fitness logging into a rewarding, gamified experience. Utilizing React Native and Node.js, it integrates OAuth for secure login and includes a custom SVG graph for progress tracking, demonstrating an early proficiency at implementing novel and innovative solutions."
        },
        {
            image: PaintingImg,
            title: "Fesslerpainting.com",
            description: "Fesslerpainting.com, developed for my own residential painting business. Built using Next.js, the website features a minimalist, responsive design and server-side rendering, showcasing my proficiency in modern web development. This venture, while successful, ultimately led me to follow my true passion for programming."
        },
        {
            image: CircuitImg,
            title: "Turing Complete CPU",
            description: "In 'Turing Complete,' a game that turns CPU design into an interactive learning experience, I constructed a CPU architecture from the ground up, designing circuits and logic gates. While including a video game project might appear unconventional in a professional portfolio, it profoundly enriched my understanding of CPU architecture and the nuances of low-level programming."
        },
        // {
        //     image: TypewriterImg,
        //     title: "Interactive Story Writer",
        //     description: "Interactive Story Writer, a Python script I developed to solve a core problem in a group project for a college class of mine: crafting a detailed, branching narrative for a text-based adventure game. Leveraging the OpenAI API, and using an innovative algorithm I devised, the script generates a rich, coherent narrative. The result? Our project had an impressive 2186 unique endings."
        // },
        {
            image: BedframeImg,
            title: "Floating Bedframe",
            description: "A floating bed frame. Yes, you read that right—a bed frame in my developer portfolio. While it may seem out of place, this bed frame embodies my versatile problem-solving abilities, merging engineering principles and programming skills beyond the digital realm. This project is entirely of my own design. Detailed math was applied to perfect the floating illusion and to engineer a circuit capable of handling the LED's demands."
        },
        // {
        //     image: AsciiImg,
        //     title: "ASCII Art Generator",
        //     description: "ASCII Art Generator, a Python script I developed, creatively applies convolution to translate images into colored ASCII art. By averaging color values and brightness, it maps images onto a grid of ASCII characters, each carefully chosen for its visual weight and color. Showcasing my technical prowess with algorithm design and my fascination with the intersection of mathematics and logic with art and creativity."
        // }
    ];

    const ProjectModalContent = [
        [ // Level Up Exercise Log
            <ProjectMedia
                key={0}
                gifContainer={
                    <GifContainerComponent
                        srcOne={LevelUpLog}
                        altOne="Level Up Exercise Log"
                        srcTwo={LevelUpPR}
                        altTwo="Level Up Personal Record"
                        srcThree={LevelUpCalendar}
                        altThree="Level Up Calendar"
                    />
                }
                caption="Level Up gamifies the experience of tracking exercise"
                width={0}
                height={0}
            />,
            <ProjectMedia
                key={1}
                gifContainer={
                    <GifContainerComponent
                        srcOne={LevelUpLogin}
                        altOne="Level Up Login"
                        srcTwo={LevelUpStats}
                        altTwo="Level Up Stats"
                        srcThree={LevelUpDelete}
                        altThree="Level Up Delete"
                    />
                }
                caption="Motivational progress metrics"
                width={0}
                height={0}
            />
        ],
        [ // Fesslerpainting.com
            <ProjectMedia
                key={0}
                image={FesslerPaintingDesktop}
                caption="Modern, minimalist desktop design"
                width={0}
                height={0}
            />,
            <ProjectMedia
                key={1}
                image={FesslerPaintingMobile}
                caption="Fully mobile responsive"
                width={0}
                height={0}
            />,
            <ProjectMedia
                key={2}
                image={FesslerPaintingReviews}
                caption="My code is meticulous too, just saying."
                width={0}
                height={0}
            />
        ],
        [ // Turing Complete CPU
            <ProjectMedia
                key={0}
                image={CpuCircuit}
                caption="Fully functioning, programmable, virtual computer"
                width={0}
                height={0}
            />,
            <ProjectMedia
                key={1}
                video={MazeVideo}
                caption="A pathfinding algorithm in my very own machine code language"
                width={0}
                height={0}
            />,
            <ProjectMedia
                key={2}
                video={MultipicationVideo}
                caption="A binary multiplication circuit"
                width={0}
                height={0}
            />
        ],
        [ // Bed frame
            <ProjectMedia
                key={0}
                video={LedVideo}
                caption="My floating bed frame"
                width={0}
                height={0}
            />,
            <ProjectMedia
                key={1}
                image={Blueprints}
                caption="The math behind the illusion"
                width={0}
                height={0}
            />,
            <ProjectMedia
                key={2}
                image={BedConstruction}
                caption="A work in progress"
                width={0}
                height={0}
            />,
            <ProjectMedia
                key={3}
                image={LEDCircuit}
                caption="Fully programmable LED strip"
                width={0}
                height={0}
            />
        ],
    ];

    // Zip the project cards and project modal content together
    let FlipManagerProps: {
        ProjectCard: React.ComponentType<any>;
        ProjectCardProps: any;
        ProjectModal: React.ComponentType<any>;
        ProjectModalProps: any;
    }[] = [];

    for (let i = 0; i < projectCards.length; i++) {
        FlipManagerProps.push({
            ProjectCard: ProjectCard,
            ProjectCardProps: projectCards[i],
            ProjectModal: ProjectModal,
            ProjectModalProps: ProjectModalContent[0]
        });
    }
    
    return (
        <ProjectsSection id="Projects">
            {projectCards.map((project, index) => {
                return (
                    <FlipManager
                        key={index}
                        ProjectCard={ProjectCard}
                        ProjectCardProps={project}
                        ProjectModal={ProjectModal}
                        ProjectModalProps={ProjectModalContent[index]}
                    />
                );
            })}
        </ProjectsSection>
    );
};

export default Projects;