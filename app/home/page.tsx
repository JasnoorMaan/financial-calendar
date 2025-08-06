"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Info from "@/components/Info";
import { motion } from "motion/react";
import Link from "next/link";
import {
  fadeInVariants,
  staggerContainer,
  staggerItem,
} from "@/app/animations/variants";
import Instructions from "@/components/Instructions";

const Landing = () => {
  return (
    <div className="overflow-x-hidden">
      <section className="relative bg-[url('/herobg.svg')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center mb-32">
          <Hero />
        </main>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="relative bg-white">
        <section className="min-h-[100vh]">
          <Info />
        </section>
      </section>
      <Instructions />

      <section className="relative min-h-screen bg-black flex items-center justify-center pt-8 mt-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/bgvideo.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <motion.div
          className="relative z-10 text-white text-center px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            variants={staggerItem}
          >
            Intuitive trading tools <br /> Build your strategy <br />
            and track market <br /> trends, seamlessly
          </motion.h2>
          <Link href="/terminal">
            <motion.div className="mt-12" variants={staggerItem}>
              <motion.button
                className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Platform
              </motion.button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};
export default Landing;
