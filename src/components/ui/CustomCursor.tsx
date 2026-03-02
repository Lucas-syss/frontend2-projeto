"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);

    const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{
                x: cursorX,
                y: cursorY,
            }}
            animate={{
                scale: isHovered ? 1.5 : 1,
                backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
                borderColor: "rgba(255, 255, 255, 1)",
                borderWidth: isHovered ? "0px" : "1.5px",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    );
}
