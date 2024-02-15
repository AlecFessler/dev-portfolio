// src/hooks/useCursorPos.ts

// this hook will take a ref to an element and use the bounding client rect to calculate the position of the cursor relative to the element

import { useEffect, useState } from 'react';

export interface CursorPos {
    x: number;
    y: number;
}

export const useCursorPos = (ref: React.RefObject<HTMLElement>): CursorPos => {
    const [cursorPos, setCursorPos] = useState<CursorPos>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (ref.current) {
                const { left, top } = ref.current.getBoundingClientRect();
                setCursorPos({
                    x: e.clientX - left,
                    y: e.clientY - top,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [ref]);

    return cursorPos;
};