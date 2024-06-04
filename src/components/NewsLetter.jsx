import Lottie from 'lottie-react';
import newsletter from '../../public/newsletter.json'

const NewsLetter = () => {
  return (
    <div className='w-full flex justify-center pb-5 flex-col items-center relative pt-10 -bottom-32 bg-[#B8F4F3] px-24 '>
      <div>
      <Lottie loop={true} animationData={newsletter} className="w-40" />
      </div>
     <div className='text-center'>
      <h2 className='text-3xl pt-16  font-bold font-fajila'>Subscribe TrackEase, for getting update</h2>
      <p className='my-8'>subscribe with your email and get regular update of our upcoming and recent feature.</p>
      <div className='bg-white max-w-sm mt-16 mx-auto flex justify-between'>
        <input type="email" placeholder='Enter your Email' className='pl-4'/>
        <button className='bg-[#1b7a74] py-3 px-5'>Subscribe</button>
      </div>
     </div>
 </div>
  );
};

export default NewsLetter;