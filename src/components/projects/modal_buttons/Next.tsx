// src/components/projects/modal_buttons/Next.tsx

import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div<{ $direction: 'left' | 'right' }>`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
    transform: ${({ $direction }) => $direction === 'left' ? 'rotateZ(45deg)' : 'rotateZ(-135deg)'};
    height: ${({ theme }) => theme.buttonSizes.small};
`;

interface NextProps {
    next: () => void;
    direction: 'left' | 'right';
    fill: string;
    stroke: string;
}

const Next = ({ next, direction, fill, stroke }: NextProps) => {
    return (
        <ButtonContainer onClick={next} $direction={direction}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style={{
                    width: '100%',
                    height: '100%'
                }}
                xmlSpace="preserve"
            >
                <g>
                    <g>
                        <line
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                                fill:  `${fill}`,
                                stroke: `${stroke}`,
                                strokeWidth: '20.0001',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: '22.9256'
                            }}
                            x1="123.77"
                            y1="388.23"
                            x2="10"
                            y2="502"
                        />
                        <line
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                                fill: `${fill}`,
                                stroke: `${stroke}`,
                                strokeWidth: '20.0001',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: '22.9256'
                            }}
                            x1="180.271"
                            y1="399.905"
                            x2="89.336"
                            y2="490.839"
                        />
                        <line
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                                fill: `${fill}`,
                                stroke: `${stroke}`,
                                strokeWidth: '20.0001',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: '22.9256'
                            }}
                            x1="243.175"
                            y1="405.175"
                            x2="199.629"
                            y2="448.721"
                        />
                        <line
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                                fill: `${fill}`,
                                stroke: `${stroke}`,
                                strokeWidth: '20.0001',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: '22.9256'
                            }}
                            x1="112.095"
                            y1="331.729"
                            x2="21.161"
                            y2="422.664"
                        />
                        <line
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                                fill: `${fill}`,
                                stroke: `${stroke}`,
                                strokeWidth: '20.0001',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: '22.9256'
                            }}
                            x1="106.825"
                            y1="268.825"
                            x2="63.279"
                            y2="312.371"
                        />
                        <polyline
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                                fill: `${fill}`,
                                stroke: `${stroke}`,
                                strokeWidth: '20.0001',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: '22.9256'
                            }}
                            points="&#10;&#9;&#9;&#9;270.799,142.071 310.728,102.142 261.163,52.576 502,10 459.424,250.837 409.859,201.272 266.365,344.766 167.234,245.636 &#10;&#9;&#9;&#9;207.159,205.71 &#9;&#9;"
                        />
                        <line
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                                fill: `${fill}`,
                                stroke: `${stroke}`,
                                strokeWidth: '19.9998',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: '2.6131'
                            }}
                            x1="238.974"
                            y1="173.889"
                            x2="238.981"
                            y2="173.889"
                        />
                    </g>
                </g>
            </svg>
        </ButtonContainer>
    );
};

export default Next;