import Lottie from 'lottie-react';
import mission from '../../../public/mission.json'

const About = () => {
  return (
    <div className="my-20 lg:px-20">
<div >
<h3 className="text-5xl text-center font-semibold underline mb-4">About Us</h3>
    <p className="text-center mb-8">At TrackEase, we understand the critical importance of efficiently managing your company's assets. Our web application is designed to streamline asset management processes for businesses of all sizes, empowering HR Managers to effectively track and monitor asset usage.</p>
</div>
{/* mission  */}
<div className="flex justify-between">
<div className="w-1/2 border-r-2 flex flex-col items-center justify-center">
<h4 className="text-3xl text-center mb-4 mt-8">Our Mission:</h4>
<p>Our mission is to provide businesses with a comprehensive and user-friendly asset management solution that simplifies the tracking of both returnable and non-returnable assets. We strive to enhance productivity, minimize asset loss, and optimize resource allocation through our innovative platform.</p>
</div>
<div className="w-1/2 flex justify-center">
<Lottie animationData={mission} loop={true} className='w-[80%] '/>;
</div>
</div>
    </div>
  );
};

export default About;