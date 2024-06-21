import LimitedStock from './LimitedStock';
import MostRequested from './MostRequsted';
import PendingRequest from './PendingRequest';
import PieChart from './PieChart';

const HrHome = () => {
  return (
    <div className=' pt-3 md:pt-20 md:px-16 px-3'>
      <PendingRequest></PendingRequest>
      <MostRequested></MostRequested>
      <LimitedStock></LimitedStock>
      <PieChart></PieChart>
    </div>
  );
};

export default HrHome;