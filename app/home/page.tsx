import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="bg-[url('/herobg.svg')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <Hero />
        {/* <div className="text-center"></div> */}
      </main>
      <Footer />
    </div>
  );
};
export default Landing;
