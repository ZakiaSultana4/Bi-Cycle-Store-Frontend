import { SquareArrowOutUpRight } from "lucide-react";
import advascing from "../assets/landing-banner.png";
import { useDarkMode } from "@/hooks/useDarkMode";

const Advancing = () => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-32 py-10 gap-10 transition-all duration-300 ${
        darkMode
          ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]'
          : 'bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]'
      }`}
    >
      {/* Left: Image */}
      <div className="w-full lg:w-1/2">
        <img
          src={advascing}
          alt="Advancing Banner"
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      {/* Right: Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 font-['Playfair_Display']">
          Advancing Electric Biking with
          <br />
          Innovation, Performance, and
          <br />
          Sustainability.
        </h1>

        <p className="text-base mb-6">
          At Eura, we revolutionized electric scooters, and now we're doing the same
          for electric bikes. Our innovative designs combine cutting-edge technology
          with unmatched performance, offering a seamless and exhilarating ride
          for every cyclist. Join us on this electrifying journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="bg-[var(--color-secondary)] flex gap-2 justify-center items-center text-white py-2 px-6 rounded-md text-sm font-semibold hover:bg-[#eb523b] transition-all">
            <p>Explore Products</p>
            <SquareArrowOutUpRight size={15} className="mt-1" />
          </button>
          <button className="bg-teal-600 text-white py-2 px-6 rounded-md text-sm font-semibold hover:bg-blue-700 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Advancing;
