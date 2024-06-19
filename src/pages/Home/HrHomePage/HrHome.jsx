import MostRequested from './MostRequsted';
import PendingRequest from './PendingRequest';

const HrHome = () => {
  return (
    <div className='pt-20 px-16'>
      <PendingRequest></PendingRequest>
      <MostRequested></MostRequested>
    </div>
  );
};

export default HrHome;