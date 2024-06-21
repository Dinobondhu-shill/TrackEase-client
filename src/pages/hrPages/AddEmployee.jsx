import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmployeeCard from "../../components/EmployeeCard";
import useRoll from "../../hooks/useRoll";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const [role] = useRoll();
  const company = role[2];
  const packages = role[3];
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [pack, setPack] = useState('')

  useEffect(() => {
    if (packages === 'premium') {
      setTotalEmployee(20);
      setPack('premium')
    } else if (packages === 'basic') {
      setTotalEmployee(5);
      setPack("basic")
    } else {
      setTotalEmployee(10);
      setPack('standard')
    }
  }, [packages]);

  const { data: teamMates = [], isLoading: isTeamLoading } = useQuery({
    queryKey: [company, 'assets'],
    queryFn: async () => {
      const encodedCompany = encodeURIComponent(company);
      const res = await axios.get(`http://localhost:5000/users/team/${encodedCompany}`);
      return res.data;
    },
    enabled: !!company, // Ensure this query runs only when 'company' is defined
  });

  const { data: freeEmployee = [], isLoading: isFreeEmployeeLoading, refetch } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/free-employee`);
      return res.data;
    },
  });

  if (isTeamLoading || isFreeEmployeeLoading) {
    return <span className="loading block mx-auto text-6xl text-center loading-spinner text-info"></span>;
  }
  refetch()

  return (
    <div className="pt-24 px-20 flex flex-col">
      <div className="flex justify-between mb-16">
      <h2 className="text-xl font-semibold ">Your Total Employee: <span className="text-sky-400">{teamMates.length}</span></h2>
      <h2 className="text-xl font-semibold ">Your Current Package: <span className="text-sky-400">{packages}</span></h2>
      <h2 className="text-xl font-semibold ">You Can Add: <span className="text-sky-400">{totalEmployee - teamMates.length}</span></h2>
      </div>
      <Link to={'/packages'} className="py-2 px-4 border rounded-md text-slate-900 font-semibold w-fit my-5 hover:bg-sky-400">Increase Limit</Link>
      <h2 className="text-2xl font-semibold  underline">Collaborate With New Employee</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto w-full my-10">
        {freeEmployee.map(person => (
          <EmployeeCard key={person._id} person={person} totalEmployee={totalEmployee} teamMates={teamMates} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default AddEmployee;
