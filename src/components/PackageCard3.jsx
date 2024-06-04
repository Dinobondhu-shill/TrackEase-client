import { FaCheck } from "react-icons/fa";


const PackageCard3 = () => {
  return (
    <div className="border py-10 px-4 rounded-2xl text-center">
      <p className="px-4 mb-3 bg-[#7fd8df] text-white w-fit rounded-3xl mx-auto">Most Popular</p>
    <h2 className="font-semibold text-xl">Premium</h2>
    <h3>Maximum 20 employees</h3>
    <h5 className="font-medium text-xl mb-4">$<span>15</span></h5>
    <p className="mb-6">Standard listing submission, active for 30days.</p>
    <div className="space-y-3">
    <div className="flex gap-2  text-start">
      <FaCheck className="text-[#75d0e0] text-xl"></FaCheck>
      <p>Designed for larger enterprises with a substantial employee base.</p>
    </div>
    <div className="flex gap-2  text-start">
      <FaCheck className="text-[#75d0e0] text-5xl"></FaCheck>
      <p>Comprehensive asset management solution with advanced features such as real-time asset tracking, integration with HR systems, and customizable user permissions.</p>
    </div>
    <div className="flex gap-2 text-start">
      <FaCheck className="text-[#75d0e0] text-xl"></FaCheck>
      <p>Dedicated account manager for personalized support and consultation.</p>
    </div>
    </div>
  </div>
  );
};

export default PackageCard3;