"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function Instructions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black py-16"
      ref={ref}
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      {/* <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Backgrounds
      </p> */}
      <section className="z-20 w-full max-w-7xl mx-auto px-4">
        <section className="min-h-[80vh] py-8">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-thin text-center text-neutral-400 py-8 md:py-16"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 30, scale: 0.95 }
            }
            transition={{
              duration: 0.8,
              type: "spring",
              damping: 15,
              stiffness: 100,
            }}
          >
            How it works
          </motion.h1>

          <motion.section
            className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8 my-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3, staggerChildren: 0.2 }}
          >
            {[
              {
                icon: "/Calendar.svg",
                title: "Select Date Range",
                subtitle: "Enter ticker symbol and press confirm",
                description:
                  "The intuitive calendar interface allows you to easily select the range over which you want to study the stock's performance.",
                bgColor: "bg-sky-200",
                hoverBorder: "hover:border-blue-200",
                iconColor: "bg-sky-400",
                delay: 0.4,
              },
              {
                icon: "/Magnifier.svg",
                title: "Analyze Calendar Trends",
                subtitle: "View price, volume, and volatility changes",
                description:
                  "Some stocks may be premium only, in which case whole data won't be shown. But AAPL, NVDA, TSLA and many more are available in free tier.",
                bgColor: "bg-orange-200",
                hoverBorder: "hover:border-green-200",
                iconColor: "bg-orange-400",
                delay: 0.6,
              },
              {
                icon: "/Dashboard.svg",
                title: "Dashboard View",
                subtitle:
                  "View metrics with daily, weekly and monthly breakdowns",
                description:
                  "Key metrics include win ratio, P/E ratio, ROE Score, ROA Score, Debt/Equity, Sharpe ratio and many more based on daily, weekly, monthly and on the whole timeframe.",
                bgColor: "bg-green-200",
                hoverBorder: "hover:border-red-200",
                iconColor: "bg-green-400",
                delay: 0.8,
              },
            ].map((item, index) => (
              <motion.section
                key={index}
                className={`group relative border-2 border-neutral-200 p-8 rounded-2xl ${item.bgColor} bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 hover:shadow-xl transition-all duration-300 ${item.hoverBorder}`}
                initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 10 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                    : { opacity: 0, y: 50, scale: 0.9, rotateX: 10 }
                }
                transition={{
                  duration: 0.6,
                  delay: item.delay,
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <motion.div
                    className="relative"
                    whileHover={{
                      scale: 1.1,
                      rotateY: 10,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.div
                      className={`absolute inset-0 ${item.iconColor} rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <Image
                      src={item.icon}
                      alt={item.title.toLowerCase()}
                      width={80}
                      height={80}
                      className="relative w-16 h-16 md:w-20 md:h-20 z-10 group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                      <motion.h2
                        className="text-lg md:text-2xl font-bold text-neutral-600 leading-tight"
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{ duration: 0.5, delay: item.delay + 0.2 }}
                      >
                        {item.title}
                      </motion.h2>
                    </div>
                    <motion.h3
                      className="text-base md:text-lg font-semibold text-neutral-500 px-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.5, delay: item.delay + 0.3 }}
                    >
                      {item.subtitle}
                    </motion.h3>
                    <motion.p
                      className="text-sm md:text-base text-neutral-400 font-medium leading-relaxed"
                      initial={{ opacity: 0, y: 15 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                      }
                      transition={{ duration: 0.5, delay: item.delay + 0.4 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </div>
              </motion.section>
            ))}
          </motion.section>
        </section>
        {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" /> */}
      </section>
    </div>
  );
}
