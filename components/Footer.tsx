const Footer = () => {
  return (
    <section className="mt-12 w-screen bg-[url('/noise.svg')] bg-black pt-4 overflow-hidden">
      <h1
        className="
         z-10 text-center text-transparent font-md bg-clip-text 
          bg-gradient-to-b from-white to-neutral-900
          [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]
          text-[clamp(2rem,18vw,16rem)]
        "
      >
        Bloomborg.
      </h1>
    </section>
  );
};

export default Footer;
