import Container from "@/components/Container";
import Products from "@/components/Products";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useAllProductsQuery } from "@/redux/features/products/productApi";
import { SquareArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import Loading from "@/components/Loading";

const FeatureProduct = () => {
  const { data, isLoading } = useAllProductsQuery(undefined);
  const { darkMode } = useDarkMode();

  if (isLoading) {
    return (
      <p className={`${darkMode ? "text-[var(--primary-foreground)]" : "text-[var(--primary-darkbackground)]"} text-center`}>
        <Loading />
      </p>
    );
  }

  return (
    <Container>
      <div className={`${darkMode ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]' : 'bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]'} py-8 rounded-md`}>
        <SectionTitle
          titleheading="Our Featured Products"
          // Pass dark mode prop if your SectionTitle supports it, otherwise styling is handled here
        />
        <Products
          data={{ data: data?.data ?? [] }}
          loading={isLoading}
          limit={6}
          // You can also add darkMode here if Products supports it
        />

        <div className="flex justify-center mt-6">
          <Link to={`allProducts`}>
            <Button
              className={`cursor-pointer flex items-center gap-2 ${
                darkMode
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : "bg-[var(--color-secondary)] hover:bg-green-700 text-white"
              }`}
            >
              View All Products
              <SquareArrowUpRight />
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default FeatureProduct;
