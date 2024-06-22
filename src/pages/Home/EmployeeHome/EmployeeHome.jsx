
import useRoll from "../../../hooks/useRoll";
import MonthlyReq from "./MonthlyReq";
import MyPendingReq from "./MyPendingReq";


const EmployeeHome = () => {
  const [role] = useRoll()
  const company = role[2]
  return (
    <div className='pt-20 px-2 md:px-16'>
     
      <MyPendingReq></MyPendingReq>
      <MonthlyReq></MonthlyReq>
      <div>
        {
          company == null ? <p className="w-full py-3 bg-[#59dad125] rounded-md font-bold text-red-600 text-center my-5">Contact with
your HR </p> : <div>

</div>
        }
      </div>
    </div>
  );
};

export default EmployeeHome;