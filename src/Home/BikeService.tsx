
import { useNavigate } from "react-router-dom";
import bikeImage from "../assets/bike-image.jpg"; // Adjust the path as necessary
const BikeService = () => {
  const navigate=useNavigate()
  return (<div className="pb-16 mt-12 ">
        <h2 className="text-3xl md:text-5xl text-center mt-8 font-bold text-gray-900 mb-8">Bike Services & Repair</h2>
    <div className="container mx-auto px-4  grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      <div className="md:col-span-7">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start gap-2">
              <p className="text-xl font-semibold">
                <span className="text-red-500">01.</span> Tune-Up & Builds
              </p>
              <span className="text-gray-600">
                Enhance your bike’s performance with expert tune-ups and custom builds.
              </span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="text-xl font-semibold">
                <span className="text-red-500">02.</span> Adjust and Install
              </p>
              <span className="text-gray-600">
                Professional adjustments and installations to keep your bike in top condition.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start gap-2">
              <p className="text-xl font-semibold">
                <span className="text-red-500">03.</span> Personal Bike Fit
              </p>
              <span className="text-gray-600">
                Get a customized bike fit for maximum comfort and efficiency.
              </span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="text-xl font-semibold">
                <span className="text-red-500">04.</span> Free Delivery
              </p>
              <span className="text-gray-600">
                Enjoy free delivery on bike services and repairs.
              </span>
            </div>
          </div>
        </div>
        <button onClick={()=> navigate('/bikes')} className="mt-6 p-2 bg-red-500 text-white  rounded-lg hover:bg-red-600 transition-all">
          SHOP NOW
        </button>
      </div>
      <div className="md:col-span-5 flex justify-center">
        <img src={bikeImage} alt="bike" className="w-full  rounded-lg shadow-lg drop-shadow-xl" />
      </div>
    </div>
    </div>
  );
};

export default BikeService;