import LoadingSkelton from './LoadingSkelton';
import ProductCard from './ProductCard';
import { useDarkMode } from '@/hooks/useDarkMode';

interface Product {
  _id: string;
  name: string;
  image: string[];
  model: string;
  price: number;
  inStock: boolean;
  description: string;
  category: string;
  brand: string;
  riderType: string;
  quantity: number;
}

interface ProductsProps {
  data: {
    data: Product[];
  };
  loading: boolean;
  limit?: number;
}

const Products = ({ data, loading, limit }: ProductsProps) => {
  const { darkMode } = useDarkMode();

  if (loading) {
    return <LoadingSkelton />;
  }

  const limitedData = limit ? data?.data?.slice(0, limit) : data?.data;

  return (
    <>
      {Array.isArray(limitedData) && limitedData.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8
          ${darkMode ? 'bg-[var(--primary-darkbackground)]' : 'bg-[var(--primary-foreground)]'}`}>
          {limitedData.map((product) => (
            <ProductCard product={product} key={product?._id} darkMode={darkMode}/>
          ))}
        </div>
      ) : (
        <div className={`text-center mt-8 
          ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No products match your search or filter criteria.
        </div>
      )}
    </>
  );
};

export default Products;
