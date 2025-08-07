"use client";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const Info = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const companyIcons = [
    { src: "/apple.svg", alt: "Apple", delay: 0.1, x: -20, y: -30 },
    { src: "/google.svg", alt: "Google", delay: 0.2, x: 30, y: -20 },
    { src: "/microsoft.svg", alt: "Microsoft", delay: 0.3, x: -30, y: 20 },
    { src: "/nvidia.svg", alt: "NVIDIA", delay: 0.4, x: 25, y: 35 },
    { src: "/tesla.svg", alt: "Tesla", delay: 0.5, x: -35, y: -15 },
    { src: "/spotify.svg", alt: "Spotify", delay: 0.6, x: 40, y: 10 },
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center py-8 px-6 md:px-12"
      ref={ref}
    >
      <div className="max-w-7xl w-full">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.95 }
                }
                transition={{
                  duration: 1,
                  delay: 0.6,
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  US Stocks at your fingertips.
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  Finance simplified.
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Experience the power of real-time market data, advanced analytics,
              and intuitive trading tools designed for modern investors.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, rotateY: 0 }
                : { opacity: 0, scale: 0.9, rotateY: 15 }
            }
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              damping: 25,
              stiffness: 100,
            }}
          >
            {/* Company icons floating around */}
            {companyIcons.map((icon, index) => (
              <motion.div
                key={icon.alt}
                className="absolute z-20"
                style={{
                  left: `${50 + icon.x}%`,
                  top: `${50 + icon.y}%`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                  rotate: 0,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        x: icon.x * 3,
                        y: icon.y * 3,
                        rotate: 360,
                      }
                    : {
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0,
                        rotate: 0,
                      }
                }
                transition={{
                  duration: 1.2,
                  delay: 1.5 + icon.delay,
                  type: "spring",
                  damping: 15,
                  stiffness: 120,
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 0,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: icon.delay,
                  }}
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={50}
                    height={50}
                    className="w-8 h-8 md:w-12 md:h-12 drop-shadow-lg"
                  />
                </motion.div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.8, delay: 1.0 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src="/infopic.webp"
                alt="dashboard"
                width={500}
                height={500}
                className="w-full h-auto rounded-2xl z-10 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Info;
