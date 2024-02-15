// src/hooks/useElemDimensions.ts

import { useEffect, useState } from 'react';

export interface Dimensions {
    left: number;
    top: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
}

export const useElemDimensions = (ref: React.RefObject<HTMLElement>): Dimensions => {
    const [dimensions, setDimensions] = useState<Dimensions>({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,
    });

    useEffect(() => {
        const element = ref.current;

        if (element) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { width, height } = entry.contentRect;
                    setDimensions({
                        left: element.offsetLeft,
                        top: element.offsetTop,
                        width,
                        height,
                        centerX: width / 2,
                        centerY: height / 2,
                    });
                }
            });

            resizeObserver.observe(element);

            return () => resizeObserver.unobserve(element);
        }
    }, [ref]);

    return dimensions;
};

export default useElemDimensions;