// src/hooks/useWindDimensions.ts

import { useEffect, useState } from 'react';

export interface Dimensions {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
}

export const useWindDimensions = (): Dimensions => {
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,
    });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
                centerX: window.innerWidth / 2,
                centerY: window.innerHeight / 2,
            });
        };

        window.addEventListener('resize', updateDimensions);

        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return dimensions;
};