// src/components/projects/ModalBackgroundShader.tsx

import React from 'react';
import styled from 'styled-components';

import Background from '../sections/Background';

import ProjectCardConstants from '../../state/ProjectCardConstants.json';
const { FLIP_DURATION } = ProjectCardConstants;

const BackgroundShader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    opacity: 0;
    z-index: -1;

    &.animateOpacity {
        animation: animateOpacity ${FLIP_DURATION}s forwards;
    }

    &.animateOpacityOut {
        animation: animateOpacityOut ${FLIP_DURATION}s forwards;
    }
`;

const ModalBackgroundShader = ({ visible }: { visible: () => string }) => {
    return (
        <BackgroundShader className={visible()}>
            <Background />
        </BackgroundShader>
    );
};

export default ModalBackgroundShader;