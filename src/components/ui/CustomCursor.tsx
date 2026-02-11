import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            const isHoverable = target.closest('a, button, input, textarea, .hoverable');
            setHovering(!!isHoverable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className={`cursor-follower ${hovering ? 'hovering' : ''}`}
            style={{ left: position.x, top: position.y }}
        />
    );
};

export default CustomCursor;
