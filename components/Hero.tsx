import HeroGrid from "./HeroGrid";

const Hero = () => {
  return (
    <section className="font-[Outfit] flex flex-col items-center justify-center gap-4 w-full px-4 mt-20 md:mt-24 md:space-y-4">
      <div className="text-center space-y-8 md:space-y-12">
        <h1 className="text-5xl md:text-6xl font-bold leading-relaxed mb-6">
          Grow your <span className="dancing-script-cursive">Wealth</span>
          <br />
          <span className="dancing-script-cursive">Monitor</span> your Stocks
        </h1>
        <button className="bg-black text-lg text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-all duration-300">
          Go to Terminal
        </button>
      </div>

      <HeroGrid />
    </section>
  );
};
export default Hero;
