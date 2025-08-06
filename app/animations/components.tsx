"use client";
import { animate, useMotionValue, useTransform, motion } from "motion/react";
import { useEffect } from "react";

// ✅ ANIMATION COMPONENTS - Ready to use in JSX
export const CountUp = ({
  value,
  duration = 1,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return () => controls.stop();
  }, [value, duration]);

  return <motion.span className={className}>{rounded}</motion.span>;
};

export const TypeWriter = ({
  text,
  speed = 50,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * (speed / 1000),
            duration: 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const PulseButton = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(59, 130, 246, 0.4)",
          "0 0 0 10px rgba(59, 130, 246, 0)",
          "0 0 0 0 rgba(59, 130, 246, 0)",
        ],
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        },
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
