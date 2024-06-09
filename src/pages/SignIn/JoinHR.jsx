
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lottiejson from "../../../public/joinhr.json"
import axios from "axios";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../firebase/FirebaseProvider";
import Swal from "sweetalert2";


const JoinHR = () => {
  const [startDate, setStartDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const {createUser, updateUserProfile} = useContext(AuthContext)
  const navigate = useNavigate();
  const options = [
    { value: 'basic', label: '5 members for $5' },
    { value: 'standard', label: '10 members for $8' },
    { value: 'premium', label: '20 members for $15' }
  ]


  const handleJoinEmployee = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.fullName.value;
    const email = form.email.value;
    const role = 'hr';
    const image = form.image.files[0];
    const company = form.companyName.value
    const companyLogo = form.companyLogo.files[0]
    const password= form.password.value
    const birthday = startDate;
   
    const uploadImage = async (image) => {
      const formData = new FormData();
      formData.append('image', image);
  
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Hosting_Key}`, formData, {
        headers: {
          "content-type": 'multipart/form-data'
        }
      });
      return response.data.data.url;
    };
    const imageUrl1 = await uploadImage(image);
    const imageUrl2 = await uploadImage(companyLogo);

    const hr = {name, email, role, birthday, imageUrl1, imageUrl2, password, company}
    console.log(hr)
    createUser(email, password)
    .then(async(result)=>{
       // send users data after login
       const response = await axios.post('http://localhost:5000/users', hr)
       console.log(response.data)

      //  update users profile
      await updateUserProfile(name, imageUrl1)
      navigate(location?.state || '/')
      Swal("You are now logged in")
     

    })
    .catch((error) => {
      console.log(error.message);
     
    });

  }

return (
<div className="pt-16 flex flex-row-reverse gap-5 lg:px-20">
<div className="w-1/3 flex flex-col justify-center">
  <h3 className="mt-10 font-semibold text-center text-2xl">Wanna grow your company with us? <br /> YOU'RE WELCOME!</h3>
  <Lottie animationData={lottiejson} loop={true}/>
  </div>
  {/* sign in form */}
  <div className="w-2/3 mt-10 space-y-4">
    <h3 className=" font-medium text-2xl text-center underline mb-5">Sign Up as a HR</h3>
    <form onSubmit={handleJoinEmployee}>
      {/* full name field */}
      <div className="flex">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Enter Your Full Name*</span>
        </div>
        <input type="text" placeholder="Type here" name="fullName" className="input input-bordered w-full max-w-xs" required />
      </label>
      {/* image field */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Select Your Photo*</span>
        </div>
        <input type="file" name="image" className="file-input file-input-bordered  file-input-sm w-full max-w-xs" required/>
      </label>
      </div>
      {/* email field */}
     <div className="flex">
     <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Enter Your Email Address*</span>
        </div>
        <input type="text" placeholder="Type here" name="email" className="input input-bordered w-full max-w-xs" required/>
      </label>
      {/* email field */}
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Enter A Password*</span>
        </div>
        <input type="text" placeholder="Type here" name="password" className="input input-bordered w-full max-w-xs" required/>
      </label>
     </div>
      {/* date of birth field */}
      <div className="flex">
      <label className="form-control w-full my-5 ">
      <div className="label">
          <span className="label-text">Select Your date of birth*</span>
        </div>
       <div >
       <ReactDatePicker placeholderText="MM/DD/YYYY"
      className="border py-3 pr-28 pl-2 rounded-xl"
      selected={startDate}
      
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy/MM/dd" />
       </div>
      </label>
      {/* select option of package */}
      <label className="form-control w-full my-5 ">
      <div className="label">
          <span className="label-text">Select a Package*</span>
        </div>
       <div>
       <Select className="max-w-xs" 
       defaultValue={selectedOption}
       onChange={setSelectedOption}
       options={options} required/>
       </div>
      </label>
      </div>
      {/* company field */}
      <div className="flex">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Enter Your Company  Name*</span>
        </div>
        <input type="text" placeholder="Type here" name="companyName" className="input input-bordered w-full max-w-xs" required />
      </label>
      {/* image field */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Select Your Company Logo*</span>
        </div>
        <input type="file" name="companyLogo" className="file-input file-input-bordered  file-input-sm w-full max-w-xs" required/>
      </label>
      </div>
      <div className="mr-16">
      <input type="submit" value="Sign Up" className="border py-2  border-[#92e0e3] w-full my-6  rounded-lg "/>
      </div>
    </form>
  </div>
  
</div>
);
};

export default JoinHR;