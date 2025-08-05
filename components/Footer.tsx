const Footer = () => {
  return (
    <section className="relative mt-12 w-screen bg-black pt-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('/noise.svg')] opacity-50 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <h1
          className="
           text-center text-transparent font-md bg-clip-text 
            bg-gradient-to-b from-white to-neutral-900
            [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]
            text-[clamp(2rem,18vw,16rem)]
          "
        >
          Bloomborg.
        </h1>
      </div>
    </section>
  );
};

export default Footer;
