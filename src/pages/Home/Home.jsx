import Lottie from "lottie-react";
import useRoll from "../../hooks/useRoll";
import loader from '../../../public/loader.json';
import HomeWithoutAccount from "./HomeWithoutAccount";
import HrHome from "./HrHomePage/HrHome";
import EmployeeHome from "./EmployeeHome/EmployeeHome";

const Home = () => {
  const [role, isHrLoading] = useRoll();
  console.log(role, isHrLoading)

  if (isHrLoading) {
    return <Lottie loop={true} animationData={loader} className="max-w-lg h-full text-center mx-auto" />;
  }
  
  if (role[0] === 'hr') {
    return <HrHome />;
  } 
  else if (role[0] === 'employee') {
    return <EmployeeHome />;
  } 
  else{
    return <HomeWithoutAccount/>
  }
};

export default Home;
