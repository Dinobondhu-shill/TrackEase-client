
import useRoll from '../hooks/useRoll';
import Lottie from 'lottie-react';
import loader from '../../public/loader.json'
import { Navigate } from 'react-router-dom';

const EmployeePrivate = ({children}) => {
  const [role, isHrLoading] = useRoll()
  console.log(role)
  if(isHrLoading){
    return <Lottie loop={true} animationData={loader} className="max-w-lg h-full text-center mx-auto" />
   }
  if(role[0]==='employee'){
    return <div>
    {
    children
  }
  </div>
  }
  else{
    return <Navigate to={'/login'}  state={location?.pathname || '/'}></Navigate>
  }
  };

export default EmployeePrivate;