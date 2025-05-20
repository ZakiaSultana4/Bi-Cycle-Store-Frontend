import brand1 from '../assets/brand/partner2.png'
import brand2 from '../assets/brand/partner3.png'
import brand3 from '../assets/brand/partner4.png'
import brand4 from '../assets/brand/partner2.png'
import brand5 from '../assets/brand/partner6.png'
import brand6 from '../assets/brand/partner7.png'
import SectionTitle from '@/components/SectionTitle'
import { useDarkMode } from '@/hooks/useDarkMode'

const Brand = () => {
  const { darkMode } = useDarkMode()
  const brands = [brand1, brand2, brand3, brand4, brand5, brand6]

  return (
    <div
      className={`py-12 transition-all duration-300 ${
        darkMode
          ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]'
          : 'bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]'
      }`}
    >
      <SectionTitle titleheading="Our Partners" />

      <div className="overflow-hidden py-8 mt-8">
        <div className="flex animate-slide gap-12 xl:gap-24 w-max mx-auto items-center">
          {[...brands, ...brands].map((brand, index) => (
            <img
              key={index}
              src={brand}
              alt={`brand-${index}`}
              className="h-16 sm:h-12 md:h-16 lg:h-20 xl:h-24 2xl:h-28 object-contain transition-transform hover:scale-105 duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Brand
