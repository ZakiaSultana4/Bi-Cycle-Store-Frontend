

import Advancing from "@/Home/Advancing";
import Banner from "@/Home/Banner";
// import BikeDesign from "@/Home/BikeDesign";

import BlogArticle from "@/Home/BlogArticle";
import Brand from "@/Home/Brand";
import FeatureProduct from "@/Home/FeatureProduct";
import Join from "@/Home/Join";
import Testimonials from "@/Home/Testimonials";
import Welcome from "@/Home/Welcome";


const Home = () => {

  return (
    <div >
      <Banner />
      <Brand />
      <FeatureProduct />
      <Welcome/>
    
      <Advancing />
      <Testimonials/>
      {/* <BikeDesign/> */}
      <BlogArticle />
      <Join />
      {/* <BikeService /> */}


    </div>
  );
};

export default Home;