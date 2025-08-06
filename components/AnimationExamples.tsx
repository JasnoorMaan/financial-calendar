"use client";
import { motion } from "motion/react";
// Components
import { CountUp, TypeWriter, PulseButton } from "@/app/animations/components";
// Hooks
import { useCountUp, useHover } from "@/app/animations/hooks";
// Variants
import {
  fadeInVariants,
  slideInVariants,
  buttonVariants,
  staggerContainer,
  staggerItem,
} from "@/app/animations/variants";
// Utilities
import { createFadeInUp, springs, easings } from "@/app/animations/utilities";

const AnimationExamples = () => {
  const { isHovered, hoverProps } = useHover();
  const customCount = useCountUp(100, 2);

  return (
    <div className="p-8 space-y-8">
      {/* 1. Using Animation Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Animation Components</h2>

        <div className="flex gap-4 items-center">
          <CountUp value={42} duration={2} className="text-4xl font-bold" />
          <TypeWriter text="Hello World!" speed={100} className="text-lg" />
        </div>

        <PulseButton className="bg-blue-500 text-white px-4 py-2 rounded">
          Click Me!
        </PulseButton>
      </section>

      {/* 2. Using Animation Hooks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Animation Hooks</h2>

        <div
          {...hoverProps}
          className={`p-4 border rounded transition-colors ${
            isHovered ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          Hover over me! Custom hook detects:{" "}
          {isHovered ? "Hovering" : "Not hovering"}
        </div>

        <div className="text-2xl">
          Custom count hook: <motion.span>{customCount}</motion.span>
        </div>
      </section>

      {/* 3. Using Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Animation Variants</h2>

        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="p-4 bg-green-100 rounded"
        >
          Fade in animation
        </motion.div>

        <motion.div
          variants={slideInVariants.left}
          initial="hidden"
          animate="visible"
          className="p-4 bg-purple-100 rounded"
        >
          Slide in from left
        </motion.div>

        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Interactive Button
        </motion.button>
      </section>

      {/* 4. Using Stagger Animations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Stagger Animation</h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-4"
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              variants={staggerItem}
              className="p-4 bg-yellow-100 rounded text-center"
            >
              Item {item}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Using Utility Functions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Utility Functions</h2>

        <motion.div
          variants={createFadeInUp(0.5)}
          initial="hidden"
          animate="visible"
          className="p-4 bg-indigo-100 rounded"
        >
          Created with utility function (0.5s delay)
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={springs.wobbly}
          className="p-4 bg-pink-100 rounded"
        >
          Using spring configuration
        </motion.div>
      </section>
    </div>
  );
};

export default AnimationExamples;
