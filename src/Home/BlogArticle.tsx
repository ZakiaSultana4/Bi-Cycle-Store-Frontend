import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import blog1 from '../assets/blog/blog1.webp';
import blog2 from '../assets/blog/blog2.webp';
import blog3 from '../assets/blog/blog3.webp';
import blog4 from '../assets/blog/blog4.webp';
import SectionTitle from '@/components/SectionTitle';
import { useDarkMode } from '@/hooks/useDarkMode';

const blogs = [
  {
    image: blog1,
    status: 'Pending',
    date: '20 Feb 2025',
    category: 'Cycling and Fitness',
    title: 'Health Benefits of Regular Riding',
    description:
      'Cycling improves cardiovascular health, strengthens muscles, and boosts mental wellness...',
  },
  {
    image: blog2,
    status: 'Published',
    date: '05 Mar 2025',
    category: 'Electric Bikes',
    title: 'Why Electric Biking is the Future',
    description:
      'Electric bikes are efficient, eco-friendly, and fun — transforming the way we commute...',
  },
  {
    image: blog3,
    status: 'Draft',
    date: '12 Jan 2025',
    category: 'Sustainability',
    title: 'Green Transportation Tips',
    description:
      'Adopt cleaner travel habits and make biking your go-to for local commutes...',
  },
  {
    image: blog4,
    status: 'Pending',
    date: '28 Feb 2025',
    category: 'Bike Maintenance',
    title: 'Keep Your Bike in Top Shape',
    description:
      'Learn essential tips on maintaining your e-bike’s performance and longevity...',
  },
  {
    image: blog2,
    status: 'Published',
    date: '05 Mar 2025',
    category: 'Electric Bikes',
    title: 'Why Electric Biking is the Future',
    description:
      'Electric bikes are efficient, eco-friendly, and fun — transforming the way we commute...',
  },
  {
    image: blog1,
    status: 'Pending',
    date: '20 Feb 2025',
    category: 'Cycling and Fitness',
    title: 'Health Benefits of Regular Riding',
    description:
      'Cycling improves cardiovascular health, strengthens muscles, and boosts mental wellness...',
  },
  {
    image: blog4,
    status: 'Pending',
    date: '28 Feb 2025',
    category: 'Bike Maintenance',
    title: 'Keep Your Bike in Top Shape',
    description:
      'Learn essential tips on maintaining your e-bike’s performance and longevity...',
  },
];

const BlogArticle = () => {
  const [index, setIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [cardWidth, setCardWidth] = useState(260);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setCardsPerPage(4);
        setCardWidth(420);
      } else if (width >= 1024) {
        setCardsPerPage(3);
        setCardWidth(300);
      } else if (width >= 640) {
        setCardsPerPage(2);
        setCardWidth(280);
      } else {
        setCardsPerPage(1);
        setCardWidth(300);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const handleNext = () => {
    if (index + cardsPerPage < blogs.length) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section
      className={`max-w-7xl mx-auto px-4 py-16 relative transition-colors duration-300 ${
        darkMode
          ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]'
          : 'bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]'
      }`}
    >
      <SectionTitle titleheading={'Latest Blog And Articles'} />

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-[55%] -translate-y-1/2 z-10 bg-white hover:bg-blue-50 p-2 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={index === 0}
      >
        <ChevronLeft />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-[55%] -translate-y-1/2 z-10 bg-white hover:bg-blue-50 p-2 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={index + cardsPerPage >= blogs.length}
      >
        <ChevronRight />
      </button>

      {/* Cards Container */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * (cardWidth + 24)}px)`,
            width: `${blogs.length * (cardWidth + 24)}px`,
          }}
        >
          {blogs.map((blog, i) => (
            <Card
              key={i}
              className={`flex-shrink-0 rounded-md shadow-md ${
                darkMode
                  ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]'
              }`}
              style={{ width: `${cardWidth}px` }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover rounded-t-md"
              />

              <CardHeader>
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                    {blog.status}
                  </span>
                  <span>{blog.date}</span>
                </div>
                <p className="text-blue-500 text-xs mt-2 uppercase font-semibold">{blog.category}</p>
                <CardTitle className="text-lg font-semibold">{blog.title}</CardTitle>
              </CardHeader>

              <CardContent className="text-sm text-gray-600">{blog.description}</CardContent>

              <CardFooter className="mt-auto">
                <button className="w-full bg-teal-700 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
                  Read More
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogArticle;
