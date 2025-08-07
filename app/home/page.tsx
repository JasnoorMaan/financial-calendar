"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Info from "@/components/Info";
import Link from "next/link";
import Instructions from "@/components/Instructions";
import { motion } from "motion/react";

const Landing = () => {
  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Animated Background - Single entrance animation */}
        <motion.div
          className="absolute inset-0 bg-[url('/herobg.svg')] bg-cover bg-center bg-no-repeat"
          initial={{
            scale: 1.2,
            opacity: 0,
            x: 50,
            y: 30,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
          }}
        />

        {/* Subtle overlay for better text readability */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        <Navbar />
        <main className="relative z-10 flex-1 flex items-center justify-center mb-32">
          <Hero />
        </main>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </section>{" "}
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

        <div className="relative z-10 text-white text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Intuitive trading tools <br /> Build your strategy <br />
            and track market <br /> trends, seamlessly
          </h2>
          <Link href="/terminal">
            <div className="mt-12">
              <button className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                Explore Platform
              </button>
            </div>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Landing;
