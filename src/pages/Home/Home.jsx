import Lottie from "lottie-react";
import useRoll from "../../hooks/useRoll";
import loader from '../../../public/loader.json'
import HomeWithoutAccount from "./HomeWithoutAccount";
import HrHome from "./HrHomePage/HrHome";

const Home = () => {
  const [role, isHrLoading] = useRoll()

  if(isHrLoading){
    return <Lottie loop={true} animationData={loader} className="max-w-lg h-full text-center mx-auto" />
   }
   if(role[0] ==='hr'){
    return <HrHome></HrHome>
   }
  return (
    <HomeWithoutAccount></HomeWithoutAccount>
  );
};

export default Home;