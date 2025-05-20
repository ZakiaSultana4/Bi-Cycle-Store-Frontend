import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import blog1 from "../assets/join/bike-2-800x650.jpg.webp";
import blog2 from "../assets/join/bike-3-800x650.jpg.webp";
import blog3 from "../assets/join/bike-5-800x650.jpg.webp";
import blog4 from "../assets/join/bike-6-800x650.jpg.webp";
import blog5 from "../assets/join/bike-9-800x650.jpg.webp";
import { useDarkMode } from "@/hooks/useDarkMode"; // Adjust path if needed

const blogImages = [blog1, blog2, blog3, blog4, blog5, blog2,blog4];

const Join = () => {
  const { darkMode } = useDarkMode();

  return (
    <section className="py-16 px-4 overflow-hidden">
      {/* Marquee Images */}
      <div className="relative w-full overflow-hidden mb-12">
        <div className="flex w-max animate-scroll-left gap-4">
          {[...blogImages, ...blogImages].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`blog-${index}`}
              className="w-40 sm:w-48 md:w-56 lg:w-64 h-28 sm:h-32 md:h-36 lg:h-40 object-cover rounded-xl shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Text and Form */}
      <div className="max-w-3xl mx-auto text-center px-2">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 font-['Russo_One'] ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          <span className="text-[#eb453b]">JOIN</span> THE{" "}
          <span className="text-[#eb453b]">CYCLECITY</span> COMMUNITY
        </h1>

        <p
          className={`mb-4 text-sm sm:text-base ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Join the CycleCity community and be part of a vibrant network of electric bike
          enthusiasts. Share your experiences, tips, and adventures with fellow riders. Together,
          we can explore the world of electric biking and make every ride an unforgettable journey.
        </p>

        <p
          className={`font-semibold mb-6 text-sm sm:text-base ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Join our community and be part of the electric biking revolution!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto px-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className={`w-full sm:flex-1 ${
              darkMode
                ? "bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-600"
                : ""
            }`}
          />
          <Button
            type="submit"
            className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Join;
