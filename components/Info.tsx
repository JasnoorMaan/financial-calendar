"use client";
import Image from "next/image";

const Info = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-8 px-6 md:px-12">
      <div className="max-w-7xl w-full">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                US Stocks at your fingertips.
                <br /> Finance simplified.
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              Experience the power of real-time market data, advanced analytics,
              and intuitive trading tools designed for modern investors.
            </p>
          </div>

          <div className="absolute top-0 left-0 w-full">
            {/* <Image
              src="/apple.svg"
              alt="apple"
              width={50}
              height={50}
              className="rotate-12"
            /> */}
          </div>
          <Image
            src="/infopic.webp"
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
