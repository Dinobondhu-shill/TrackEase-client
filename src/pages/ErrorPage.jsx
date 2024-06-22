import { Link } from "react-router-dom";
import error from '../../public/error.json'
import Lottie from "lottie-react";

const ErrorPage = () => {
  return (
    <div className='flex flex-col gap-5 text-center justify-center items-center my-20 w-full h-full'>
     <Lottie loop={true} animationData={error} className="w-1/2" />
    <Link to='/' className="px-5 py-3 border-2 rounded-2xl border font-caption w-fit text-center hover:scale-105 hover:bg-cyan-600">Go back to home</Link>
    </div>
  );
};

export default ErrorPage;