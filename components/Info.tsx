"use client";
import { motion } from "motion/react";
import Image from "next/image";
import {
  fadeInVariants,
  slideInVariants,
  staggerContainer,
  staggerItem,
} from "@/app/animations/variants";

const Info = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-8 px-6 md:px-12">
      <div className="max-w-7xl w-full">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="space-y-6" variants={staggerItem}>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                variants={staggerItem}
              >
                US Stocks at your fingertips.
                <br /> Finance simplified.
              </motion.h1>

              {/* <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                variants={staggerItem}
              ></motion.h1> */}
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg"
              variants={staggerItem}
            >
              Experience the power of real-time market data, advanced analytics,
              and intuitive trading tools designed for modern investors.
            </motion.p>
          </motion.div>

          <div className="absolute top-0 left-0 w-full">
            <Image
              src="/apple.svg"
              alt="apple"
              width={50}
              height={50}
              className="rotate-12"
            />
          </div>
          <Image
            src="/infopic.svg"
            alt="dashboard"
            width={500}
            height={500}
            className="w-full h-auto rounded-2xl z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Info;
