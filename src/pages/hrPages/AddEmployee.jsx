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
    if(isPending) return <span className="loading block mx-auto text-6xl text-center loading-spinner text-info "></span>
  return (
    <div className="pt-24 px-20 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold text-center underline">Collaborate With New Employee</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto w-full my-10">
        {freeEmployee && freeEmployee.map(person=> <EmployeeCard key={person._id} person={person} refetch={refetch}></EmployeeCard>)}
      </div>
    </div>
  );
};

export default AddEmployee;