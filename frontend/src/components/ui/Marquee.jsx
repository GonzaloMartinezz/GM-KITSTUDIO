import React from "react";
import { motion } from "framer-motion";

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <div
      {...props}
      className={`group flex overflow-hidden p-2 gap-4 ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: vertical ? 0 : reverse ? ["-100%", "0%"] : ["0%", "-100%"],
              y: vertical ? (reverse ? ["-100%", "0%"] : ["0%", "-100%"]) : 0,
            }}
            transition={{
              duration: 30, // Default duration, could be extracted from props but 30 is a good baseline
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            className={`flex shrink-0 justify-around gap-4 ${
              vertical ? "flex-col" : "flex-row"
            } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
            style={pauseOnHover ? { animationPlayState: 'inherit' } : {}}
          >
            {children}
          </motion.div>
        ))}
    </div>
  );
}
