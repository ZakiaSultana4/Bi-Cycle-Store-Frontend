import { Outlet } from "react-router-dom";
;
import { useDarkMode } from "@/hooks/useDarkMode";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/Footer";


const MainLayout = () => {
    const { darkMode} = useDarkMode();
  return (
    <div className="flex flex-col min-h-screen ">
  
      <Navbar />
      {/* Main content */}
      <div className={`${darkMode ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]' :
            'bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]'}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;