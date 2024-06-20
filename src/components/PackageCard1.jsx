import { FaCheck } from "react-icons/fa";


const PackageCard1 = () => {
  return (
    <div className="border py-10 px-4 shadow-md rounded-2xl text-center">
      <h2 className="font-semibold text-xl">Basic</h2>
      <h3>Maximum 5 employees</h3>
      <h5 className="font-medium text-xl mb-4">$<span>5</span></h5>
      <p className="mb-6">Standard listing submission, active for 30days.</p>
      <div className="space-y-3">
      <div className="flex gap-2  text-start">
        <FaCheck className="text-[#75d0e0] text-xl"></FaCheck>
        <p>Ideal for small businesses or startups with a limited number of employees.</p>
      </div>
      <div className="flex gap-2  text-start">
        <FaCheck className="text-[#75d0e0] text-xl"></FaCheck>
        <p>Access to essential features for tracking assets and monitoring usage.</p>
      </div>
      <div className="flex gap-2 text-start">
        <FaCheck className="text-[#75d0e0] text-xs"></FaCheck>
        <p>Basic reporting and analytics capabilities.</p>
      </div>
      </div>
    </div>
  );
};

export default PackageCard1;