import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BikeDesign() {
  const navigate=useNavigate()
  return (
    <section className="container mx-auto bg-black text-white py-12 px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Section - Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            YOUR BIKE YOUR WAY OUR BRILLIANT DESIGN
          </h1>
          <p className="text-gray-300 mt-4">
            You’re a one-off, so why isn’t your bike? Select from almost 2 million design and color
            options—with hundreds of component choices from leading brands—and make your bike your own.
          </p>
        </div>

        {/* Right Section - Video Preview */}
        <div className="relative group">
          <img
            src="https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Rider"
            className="w-full rounded-lg object-cover"
          />
          <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition duration-300 rounded-lg">
            <Play className="w-12 h-12 text-yellow-400" />
          </button>
        </div>
      </div>

      {/* Custom Bikes Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Custom Bike"
            className="w-full rounded-lg object-cover"
          />
          <button className="absolute left-4 bottom-4 bg-yellow-400 text-black p-2 rounded-full shadow-lg hover:bg-yellow-500 transition">
            ←
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold uppercase">Custom Bikes of the Month</h2>
          <p className="text-gray-300 mt-2">
            A SHOW-STOPPING Yamaha GTS 1000 from Italy, a neo-retro Yamaha XT250 from Australia, and a very slick
            body kit for the BMW R nineT from France.
          </p>
          <Button onClick={()=>navigate('/bikes')} className="mt-4  px-6 py-2">
            See More
          </Button>
        </div>
      </div>
    </section>
  );
}