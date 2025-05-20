import { Link } from "react-router-dom";

const BackHome = ({ message }: { message: string }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h3 className="uppercase text-2xl  text-primary-red"> {message}</h3>
      <Link to="/">
        <button className="border px-5 py-2 rounded-md border-primary-red text-primary-red font-bold text-lg mt-5 hover:bg-primary-red hover:text-white duration-300">Back</button>
      </Link>
    </div>
  );
};

export default BackHome;