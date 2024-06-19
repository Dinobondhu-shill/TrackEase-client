import LimitedStock from './LimitedStock';
import MostRequested from './MostRequsted';
import PendingRequest from './PendingRequest';
import PieChart from './PieChart';

const HrHome = () => {
  return (
    <div className='pt-20 px-16'>
      <PendingRequest></PendingRequest>
      <MostRequested></MostRequested>
      <LimitedStock></LimitedStock>
      <PieChart></PieChart>
    </div>
  );
};

export default HrHome;