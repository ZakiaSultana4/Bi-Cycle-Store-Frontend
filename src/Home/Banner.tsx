import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

import Banner1 from '../assets/Banner/Banner1.webp';
import Banner2 from '../assets/Banner/Banner2.jpg';
import Banner7 from '../assets/Banner/slider3.jpg';

import { useDarkMode } from '@/hooks/useDarkMode';
import { Link } from 'react-router';

const slides = [
  {
    image: Banner1,
    title: 'Discover Your Perfect Ride',
    description: 'Welcome to CycleCity – where passion meets the pedal. Find the best bikes for every lifestyle.',
  },
  {
    image: Banner2,
    title: 'Style. Speed. Sustainability.',
    description: 'Cruise the city in style with our eco-friendly and powerful bikes. Ready for your next adventure?',
  },
  {
    image: Banner7,
    title: 'Urban Commuting Made Easy',
    description: 'Navigate the city efficiently with our lightweight and durable commuter bikes.',
  },
];

const Banner = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className="w-full h-[91vh] overflow-hidden mt-[69px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full transition-all duration-1000 ease-in-out">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Gradient overlay changes with darkMode */}
              <div
                className={`absolute inset-0 ${darkMode
                    ? 'bg-gradient-to-r from-black/90 via-black/75 to-transparent'
                    : 'bg-gradient-to-r from-black/70 via-black/40 to-transparent'
                  }`}
              ></div>

              {/* Text container */}
              <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12 lg:px-20 space-y-5">
                <h1
                  className={`font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg ${darkMode ? 'text-white' : 'text-white'
                    }`}
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl drop-shadow-md ${darkMode ? 'text-gray-300' : 'text-white'
                    }`}
                >
                  {slide.description}
                </p>
                <Link to={`allProducts`}>
                  <button
                    className={`px-5 cursor-pointer sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md transition ${darkMode
                        ? 'bg-teal-700 text-white hover:bg-teal-800'
                        : 'bg-teal-900 text-white hover:bg-teal-800'
                      }`}
                  >
                    Shop Now
                  </button>
                </Link>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
