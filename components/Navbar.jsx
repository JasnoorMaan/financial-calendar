import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <section className="bg-white space-x-20 md:space-x-64 bg-blend-overlay sticky top-0 z-50 flex justify-between items-center p-4 rounded-xl mt-2 mx-auto max-w-6xl shadow-lg">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
        >
          Bloomborg.
        </Link>
        <Link href="/terminal">
          <button className="bg-[#2c2c2c]  text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-all duration-300">
            Go to Terminal
          </button>
        </Link>
      </section>
    </>
  );
};
export default Navbar;
