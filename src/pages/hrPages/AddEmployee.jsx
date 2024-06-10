import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmployeeCard from "../../components/EmployeeCard";


const AddEmployee = () => {
  const {data:freeEmployee={}, isPending, refetch} = useQuery({
    queryKey:['assets'],
    
    queryFn: async()=>{
      const res = await axios.get(`http://localhost:5000/free-employee`)
      return res.data
    }
    });
    console.log(freeEmployee)
  return (
    <div className="pt-24 px-10">
      <h2 className="text-3xl font-semibold text-center underline">Collaborate With New Employee</h2>
      <div>
        <EmployeeCard></EmployeeCard>
      </div>
    </div>
  );
};

export default AddEmployee;