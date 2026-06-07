"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";

export default function FluidCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] h-6 w-6 rounded-full bg-blue-500/40 backdrop-blur-sm"
      animate={{
        x: x.get() - 12,
        y: y.get() - 12,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 200,
      }}
    />
  );
}