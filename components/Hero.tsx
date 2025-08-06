import Link from "next/link";
import HeroGrid from "./HeroGrid";
import { motion } from "motion/react";
import { animate, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

const Hero = () => {
  return (
    <section className="font-[Outfit] flex flex-col items-center justify-center gap-4 w-full px-4 mt-20 md:mt-24 md:space-y-4">
      <div className="text-center space-y-8 md:space-y-12">
        <h1 className="text-5xl md:text-6xl font-bold leading-relaxed mb-6">
          Grow your <span className="dancing-script-cursive">Wealth</span>
          <br />
          <span className="dancing-script-cursive">Monitor</span> your Stocks
        </h1>
        <Link href="/terminal">
          <button className="bg-[#2c2c2c] text-lg text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-all duration-300">
            Go to Terminal
          </button>
        </Link>
      </div>

      <HeroGrid />
    </section>
  );
};
export default Hero;
