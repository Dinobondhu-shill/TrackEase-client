import Lottie from "lottie-react";
import { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lottiejson from "../../../public/joinEmployee.json"
import axios from "axios";
import { AuthContext } from "../../firebase/FirebaseProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";


const JoinEmployee = () => {
  const [startDate, setStartDate] = useState(null);
  const [error, setError] = useState('')
  const {createUser, updateUserProfile, loading, googleLogin} = useContext(AuthContext)
  const navigate = useNavigate();


  const handleJoinEmployee = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.fullName.value;
    const email = form.email.value;
    const role = 'employee';
    const image = form.image.files[0]
    const password= form.password.value
    const company = null;
    const birthday = startDate;
    const formData = new FormData();
    formData.append('image', image);

    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Hosting_Key}`, formData, {
      headers:{
        "content-type":'multipart/form-data'
      }
    });
const imageUrl = response.data.data.url;
const employee = {name, email, role, birthday, imageUrl, company}
console.log(employee)
    createUser(email, password)
    .then(async(result)=>{
       // send users data after login
       const response = await axios.post('http://localhost:5000/users', employee)
       console.log(response.data)

      //  update users profile
      await updateUserProfile(name, imageUrl)
      navigate(location?.state || '/')
      Swal.fire("You are now logged in");
     

    })
    .catch((error) => {
      setError(error.massage)
     
    });
   

  }
  const handleSocailLogin = socialProvider =>{
    socialProvider ()
    .then( async(result)=>{
      const email = result.user?.email
      const name = result.user?.displayName
      const image = result.user?.imageURL
      const role = 'employee'
      const company = null
      const employee ={email, name, image, role, company}
       // send users data after login
       const response = await axios.post('http://localhost:5000/users', employee)

      navigate(location?.state || '/')
      Swal.fire("You are now logged in");

    })
  }
return (
<div className="pt-16 flex gap-5 lg:px-20">
<div className="w-2/3">
  <h3 className="mt-10 font-semibold text-center text-3xl">Welcome Our Community, We're seeking manpower like you !</h3>
  <Lottie animationData={lottiejson} loop={true}/>
  </div>
  {/* sign in form */}
  <div className="w-1/3 my-10">
    <h3 className=" font-medium text-2xl mb-5">Sign Up as a Employee</h3>
    <form onSubmit={handleJoinEmployee}>
      {/* full name field */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Enter Your Full Name*</span>
        </div>
        <input type="text" placeholder="Type here" name="fullName" className="input input-bordered w-full max-w-xs" required />
      </label>
      {/* full name field */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Select Your Photo*</span>
        </div>
        <input type="file" name="image" className="file-input file-input-bordered  file-input-sm w-full max-w-xs" required/>
      </label>
      {/* email field */}
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
      {/* date of birth field */}
      <label className="form-control w-full my-5 ">
      <div className="label">
          <span className="label-text">Select Your date of birth*</span>
        </div>
       <div>
       <ReactDatePicker placeholderText="0/0/0000" className="border py-3 pr-28 pl-2 rounded-xl" selected={startDate} onChange={(date) => setStartDate(date)} />
       </div>
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <input type="submit" value="Sign Up" className="border cursor-pointer border-[#92e0e3] mx-auto px-4 py-2 rounded-lg "/>
    </form>
    <div className="md:w-2/4">
<p data-aos="fade-left" className="mt-4 text-[16px] pb-4">Sign up as <Link to={'/join-as-hr'} className="underline  text-blue-400">HR</Link> </p> <hr />
<h2 data-aos="fade-right" className="font-bold mt-4">Or Continue With:</h2>
<div className="flex justify-between mt-4 ju">
<button 
onClick={()=>  handleSocailLogin(googleLogin)}
 className="text-4xl"> <FcGoogle /> </button>
<button 
// onClick={()=> handleSocailLogin(githubLogin)}
 className="text-4xl"> <FaGithub /> </button>
<button 
// onClick={()=> handleSocailLogin(facebookLogin)}
 className="text-4xl text-blue-500"> <SiFacebook /> </button>
</div>
</div>
  </div>
  
</div>
);
};

export default JoinEmployee;