'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const VerticalThreads = dynamic(() => import('@/components/VerticalThreads'), {
    ssr: false,
});

const THREADS_COLOR: [number, number, number] = [0.23, 0.51, 0.96]; // blue-500

export default function StarfieldBackground() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Elegant fade in delay
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
            style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'opacity',
            }}
        >
            <VerticalThreads
                color={THREADS_COLOR}
                amplitude={1.2}
                distance={0}
                enableMouseInteraction={true}
            />
        </div>
    );
}
