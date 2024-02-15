// src/hooks/useElemDimensions.ts

import { useEffect, useState } from 'react';

export interface Dimensions {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
}

export const useElemDimensions = (ref: React.RefObject<HTMLElement>): Dimensions => {
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,
    });

    useEffect(() => {
        if (ref.current) {
            setDimensions({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
                centerX: ref.current.offsetWidth / 2,
                centerY: ref.current.offsetHeight / 2,
            });
        }
    }, [ref]);

    return dimensions;
};

export default useElemDimensions;