import { useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import bycycle1 from '../assets/Welcome/download.svg'
import bycycle2 from '../assets/Welcome/download2.svg'
import bycycle3 from '../assets/Welcome/download3.svg'
import bycycle4 from '../assets/Welcome/download4.svg'
import bycycle5 from '../assets/Welcome/download.svg'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useDarkMode } from '@/hooks/useDarkMode'

const cards = [
  {
    id: 1,
    title: 'Premium Bikes',
    desc: 'Explore a wide range of high-performance bikes for every terrain.',
    icon: bycycle1,
  },
  {
    id: 2,
    title: 'Accessories',
    desc: 'Get the best gears and accessories to enhance your cycling journey.',
    icon: bycycle2,
  },
  {
    id: 3,
    title: 'Expert Support',
    desc: 'Our professionals help you choose the right product every time.',
    icon: bycycle3,
  },
  {
    id: 4,
    title: 'Delivery & Support',
    desc: 'Fast delivery and responsive support for your orders.',
    icon: bycycle4,
  },
  {
    id: 5,
    title: 'Custom Builds',
    desc: 'Tailor-made bikes to suit your style and performance needs.',
    icon: bycycle5,
  },
  {
    id: 6,
    title: 'Maintenance Plans',
    desc: 'Regular maintenance packages for long-lasting performance.',
    icon: bycycle1,
  },
  {
    id: 7,
    title: 'Community Events',
    desc: 'Join rides and events with fellow bike lovers.',
    icon: bycycle2,
  },
]

const Welcome = () => {
  const [startIndex, setStartIndex] = useState(0)
  const cardsPerPage = 4
  const { darkMode } = useDarkMode()

  const handleNext = () => {
    if (startIndex + cardsPerPage < cards.length) {
      setStartIndex(startIndex + cardsPerPage)
    }
  }

  const handlePrev = () => {
    if (startIndex - cardsPerPage >= 0) {
      setStartIndex(startIndex - cardsPerPage)
    }
  }

  const visibleCards = cards.slice(startIndex, startIndex + cardsPerPage)

  return (
    <div
      className={`py-12 transition-all duration-300 ${
        darkMode
          ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]'
          : 'bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]'
      }`}
    >
      <SectionTitle titleheading="Welcome to Our Bike Store" />

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Playfair_Display']">
          Discover Your Perfect Ride in Cycle City
        </h2>
        <p className="text-base md:text-lg leading-relaxed">
          Whether you're commuting, exploring, or racing, we offer a curated
          selection of bikes, gear, and expert advice to elevate your ride.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto mt-12">
        {/* Arrow Buttons */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`p-2 rounded-full transition disabled:opacity-50 ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + cardsPerPage >= cards.length}
            className={`p-2 rounded-full transition disabled:opacity-50 ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {visibleCards.map(({ id, title, desc, icon }) => (
            <div
              key={id}
              className={`p-6 rounded-2xl h-full flex flex-col justify-between transition duration-300 shadow-md ${
                darkMode
                  ? 'bg-gray-800 shadow-gray-700 hover:shadow-gray-600'
                  : 'bg-white shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex-grow">
                <img src={icon} alt={title} className="w-20 h-20 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2 text-center">{title}</h4>
                <p className="text-sm text-center">{desc}</p>
              </div>
              <div className="mt-6">
                <button
                  className="w-full px-5 py-2 text-sm font-medium rounded-md transition duration-300 bg-[var(--color-secondary)] text-[var(--primary-foreground)] hover:bg-primary-dark"
                >
                  See More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Welcome
