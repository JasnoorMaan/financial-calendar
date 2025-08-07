"use client";

import Link from "next/link";
import HeroGrid from "./HeroGrid";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <motion.section
      className="font-[Outfit] flex flex-col items-center justify-center gap-4 w-full px-4 mt-20 md:mt-24 md:space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, staggerChildren: 0.3, delayChildren: 0.2 }}
    >
      <motion.div
        className="text-center space-y-8 md:space-y-12"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-relaxed mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Grow your{" "}
          </motion.span>
          <motion.span
            className="dancing-script-cursive"
            initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              type: "spring",
              bounce: 0.4,
            }}
            whileHover={{
              scale: 1.1,
              rotateZ: 5,
              transition: { duration: 0.3 },
            }}
          >
            Wealth
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.span
              className="dancing-script-cursive"
              initial={{ opacity: 0, scale: 0.8, rotateZ: 10 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.1,
                type: "spring",
                bounce: 0.4,
              }}
              whileHover={{
                scale: 1.1,
                rotateZ: -5,
                transition: { duration: 0.3 },
              }}
            >
              Monitor
            </motion.span>{" "}
            your Stocks
          </motion.span>
        </motion.h1>

        <Link href="/terminal">
          <motion.button
            className="bg-[#2c2c2c] text-lg text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.3,
              type: "spring",
              bounce: 0.3,
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            Go to Terminal
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <HeroGrid />
      </motion.div>
    </motion.section>
  );
};
export default Hero;
