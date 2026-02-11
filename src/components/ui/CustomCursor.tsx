import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    // Use refs for the current animation state to avoid re-renders on every frame
    const positionRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetRef.current = { x: e.clientX, y: e.clientY };

            const target = e.target as HTMLElement;
            const isHoverable = target.closest('a, button, input, textarea, .hoverable, img');
            setHovering(!!isHoverable);
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            if (!cursorRef.current) return;

            // Lerp factor - lower is smoother/slower, higher is snappier
            const lerp = 0.1;

            positionRef.current.x += (targetRef.current.x - positionRef.current.x) * lerp;
            positionRef.current.y += (targetRef.current.y - positionRef.current.y) * lerp;

            cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`cursor-follower fixed pointer-events-none z-[9999] rounded-full mix-blend-difference bg-white transition-[width,height] duration-300 ease-out will-change-transform ${hovering ? 'w-12 h-12 opacity-50' : 'w-4 h-4'
                }`}
            style={{
                left: 0,
                top: 0
                // Transform is handled by JS for performance
            }}
        />
    );
};

export default CustomCursor;
