import SectionTitle from "@/components/SectionTitle";
import perona1 from "../assets/Testimonials/testimo1.jpg";
import perona2 from "../assets/Testimonials/testi03.jpg";
import perona3 from "../assets/Testimonials/testi06.jpg";
import { useDarkMode } from "@/hooks/useDarkMode";

const testimonials = [
  {
    id: 1,
    name: "Sophia Lee",
    title: "Marketing Expert",
    image: perona1,
    quote:
      "This platform transformed the way I experience events. It’s smooth, fast, and very intuitive!",
  },
  {
    id: 2,
    name: "Jackson Rivera",
    title: "Tech Entrepreneur",
    image: perona2,
    quote: "An absolute game changer. Booking and managing events has never been easier.",
  },
  {
    id: 3,
    name: "Amelia Chen",
    title: "UX Designer",
    image: perona3,
    quote: "I love the clean interface and the attention to detail. It’s a joy to use.",
  },
];

const Testimonials = () => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`py-12 transition-all duration-300 ${
        darkMode
          ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
          : "bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]"
      }`}
    >
      <SectionTitle titleheading="Testimonials" />

      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Playfair_Display']">
          Why Our Customers Love RoadPedal
        </h2>
        <p className="text-base md:text-lg leading-relaxed">
          At RoadPedal, we believe in creating unforgettable travel experiences.
          Hear from our happy riders who’ve explored the road with confidence,
          comfort, and convenience.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto px-4">
        {testimonials.map(({ id, name, title, image, quote }) => (
          <div
            key={id}
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ${
              darkMode ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-gray-300"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={image}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h4 className="font-semibold text-lg">{name}</h4>
                <p className="text-sm opacity-80">{title}</p>
              </div>
            </div>
            <p className="italic text-sm md:text-base">“{quote}”</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
