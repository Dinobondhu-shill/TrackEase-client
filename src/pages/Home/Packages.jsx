
import PackageCard1 from '../../components/PackageCard1';
import PackageCard2 from '../../components/PackageCard2';
import PackageCard3 from '../../components/PackageCard3';

const Packages = () => {
  return (
    <div className='lg:px-20'>
      <h3 className='text-4xl text-center '>Our Packages</h3>
      <p className='text-center mt-3'>Choose your Perfect package for doing amazing work</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10'>
        <PackageCard1></PackageCard1>
        <PackageCard3></PackageCard3>
        <PackageCard2></PackageCard2>
        
      </div>
    </div>
  );
};

export default Packages;