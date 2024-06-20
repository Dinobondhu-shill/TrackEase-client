import MonthlyReq from "./MonthlyReq";
import MyPendingReq from "./MyPendingReq";


const EmployeeHome = () => {
  return (
    <div className='pt-20 px-16'>
      <MyPendingReq></MyPendingReq>
      <MonthlyReq></MonthlyReq>
      
    </div>
  );
};

export default EmployeeHome;