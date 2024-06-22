import axios from "axios";
import useRoll from "../hooks/useRoll";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const EmployeeCard = ({person,totalEmployee, teamMates, refetch}) => {
  const [role] = useRoll()
  console.log(role)
  const company = role[2]
  const imageUrl2 = role[1]
  const addingEmployee = {company, imageUrl2}
  console.log(addingEmployee)
   
  const handleAddToTeam =async(id)=>{
    if(teamMates.length >= totalEmployee){
      return toast("You can't add employees, please increase the package")
    }
    const res = await axios.put(`http://localhost:5000/add-employee/${id}`, addingEmployee);
    if(res.data.modifiedCount>0){
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Employee has been added your Team",
        showConfirmButton: false,
        timer: 2000
      });
    }
    refetch()
  }
return (
<div className="border-2 rounded-xl bg-[#69a3a862] px-6 py-4 flex flex-col justify-center w-fit">
  <div className="avatar mb-4 flex items-center justify-center">
    <div className="w-16 rounded-full ring ring-primary-content ring-offset-base-100 ring-offset-2">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <ToastContainer></ToastContainer>
  <h2 className="text-2xl font-bold">{person?.name}</h2>
  <button onClick={()=>handleAddToTeam(person._id)} className="border w-fit mx-auto py-2 px-3 rounded-md my-3 bg-[#69a3a840] font-semibold hover:bg-[#69a3a8a7] hover:text-white">Add to Team</button>
</div>
);
};

export default EmployeeCard;