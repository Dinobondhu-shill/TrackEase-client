import useRoll from "../hooks/useRoll";

const EmployeeCard = ({person}) => {
  const [role] = useRoll()
  console.log(role)
  const company = role[2]
  const imageUrl2 = role[1]
  const packages = role[3]
  
  

return (
<div className="border-2 rounded-xl bg-[#69a3a862] px-6 py-4 flex flex-col justify-center w-fit">
  <div className="avatar mb-4 flex items-center justify-center">
    <div className="w-16 rounded-full ring ring-primary-content ring-offset-base-100 ring-offset-2">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <h2 className="text-2xl font-bold">{person?.name}</h2>
  <button className="border w-fit mx-auto py-2 px-3 rounded-md my-3 bg-[#69a3a840] font-semibold hover:bg-[#69a3a8a7] hover:text-white">Add to Team</button>
</div>
);
};

export default EmployeeCard;