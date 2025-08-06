"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Instructions() {
  return (
    <div className=" relative flex h-[180vh] md:h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
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
      <section className="z-20">
        <section className="min-h-[140vh] md:min-h-[100vh] my-4">
          <h1 className="z-19 text-9xl md:text-9xl font-thin text-center text-neutral-400 py-16">
            How it works
          </h1>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8 md:mx-16 my-12">
            <section className="group relative border-2 border-neutral-200 p-8 rounded-2xl bg-sky-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-sky-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <Image
                    src="/Calendar.svg"
                    alt="calendar"
                    width={80}
                    height={80}
                    className="relative w-16 h-16 md:w-20 md:h-20 z-10 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <h2 className="text-lg md:text-2xl font-bold text-neutral-600 leading-tight">
                      Select Date Range
                    </h2>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-neutral-500 px-2">
                    Enter ticker symbol and press confirm
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 font-medium leading-relaxed">
                    The intuitive calendar interface allows you to easily select
                    the range over which you want to study the stock's
                    performance.
                  </p>
                </div>
              </div>
            </section>

            <section className="group relative border-2 border-neutral-200 p-8 rounded-2xl bg-orange-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 hover:shadow-xl transition-all duration-300 hover:border-green-200">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <Image
                    src="/Magnifier.svg"
                    alt="magnifier"
                    width={80}
                    height={80}
                    className="relative w-16 h-16 md:w-20 md:h-20 z-10 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <h2 className="text-lg md:text-2xl font-bold text-neutral-600 leading-tight">
                      Analyze Calendar Trends
                    </h2>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-neutral-500 px-2">
                    View price, volume, and volatility changes
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 font-medium leading-relaxed">
                    Some stocks may be premium only, in which case whole data
                    won't be shown. But AAPL, NVDA, TSLA and many more are
                    available in free tier.
                  </p>
                </div>
              </div>
            </section>

            <section className="group relative border-2 border-neutral-200 p-8 rounded-2xl bg-green-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 hover:shadow-xl transition-all duration-300 hover:border-red-200">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <Image
                    src="/Dashboard.svg"
                    alt="dashboard"
                    width={80}
                    height={80}
                    className="relative w-16 h-16 md:w-20 md:h-20 z-10 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <h2 className="text-lg md:text-2xl font-bold text-neutral-600 leading-tight">
                      Dashboard View
                    </h2>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-neutral-500 px-2">
                    View metrics with daily, weekly and monthly breakdowns
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 font-medium leading-relaxed">
                    Key metrics include win ratio, P/E ratio, ROE Score, ROA
                    Score, Debt/Equity, Sharpe ratio and many more based on
                    daily, weekly, monthly and on the whole timeframe.
                  </p>
                </div>
              </div>
            </section>
          </section>
        </section>
        {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" /> */}
      </section>
    </div>
  );
}
