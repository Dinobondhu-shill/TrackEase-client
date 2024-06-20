
import { FaCheck } from 'react-icons/fa';

const PackageCard2 = () => {
  return (
    <div className="border py-10 shadow-md px-4 rounded-2xl text-center">
      <h2 className="font-semibold text-xl">Standard
</h2>
      <h3>Maximum 10 employees</h3>
      <h5 className="font-medium text-xl mb-4">$<span>8</span></h5>
      <p className="mb-6">Standard listing submission, active for 30days.</p>
      <div className="space-y-3">
      <div className="flex gap-2  text-start">
        <FaCheck className="text-[#75d0e0] text-xl"></FaCheck>
        <p>Suitable for growing businesses with a moderate workforce size.</p>
      </div>
      <div className="flex gap-2  text-start">
        <FaCheck className="text-[#75d0e0] text-3xl"></FaCheck>
        <p>Expanded features including advanced reporting, asset maintenance tracking, and customizable asset categories.</p>
      </div>
      <div className="flex gap-2 text-start">
        <FaCheck className="text-[#75d0e0] text-xs"></FaCheck>
        <p>Priority customer support for timely assistance.</p>
      </div>
      </div>
    </div>
  );
};

export default PackageCard2;