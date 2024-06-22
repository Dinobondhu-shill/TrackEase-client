import {  useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginL from "../../../public/login.json"
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../firebase/FirebaseProvider";
import Swal from "sweetalert2";
import axios from "axios";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
const [login, setLogin] = useState('')
const {signIn, googleLogin,githubLogin, facebookLogin } = useContext(AuthContext)
const navigate = useNavigate();
const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    console.log(data.Email, data.Password)
    signIn(data.Email, data.Password)
    .then(res=>{
      Swal("You are now logged in")
      setLogin('login successful')
      navigate('/')
      
    })
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
       const response = await axios.post('https://track-ease-server.vercel.app/users', employee)
       Swal.fire("You are now logged in");

       navigate('/')
     

    })
  }

  return (
    <div className="px-5 pt-20 md:px-10  text-center">
      <h2 className="text-2xl font-caption "><span className="font-bold  text-3xl">Welcome to TrackEase!</span><br /> Login and connect with HR and grow your company together.</h2>
     <div className="md:flex flex-row-reverse justify-between items-center pt-10">

     <div className="md:w-2/4 w-[80%]">
     <Lottie loop={true} animationData={loginL} className="w-[90%]" />
      </div>
      <div className="md:w-2/4 w-full md:ml-32">
      <form
        onSubmit={handleSubmit(onSubmit)}
className=" flex flex-col w-full md:w-1/2 gap-3">
<label data-aos="fade-down" data-os-duration="1000" className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
  <input  {...register("Email", { required: true })}
  type="text" className="" placeholder="Email" />
</label>
{errors.Email && <span className="text-red-700 font-bold">You must enter your Email</span>}
<ToastContainer></ToastContainer>

<label data-aos="fade-down" data-os-duration="1100" className="input input-bordered flex items-center gap-2 relative">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input {...register("Password", { required: true })}
   type={showPassword? "text": "password"} className="grow" placeholder="Password" />
   <span className="cursor-pointer absolute top-[13px] text-[20px] z-10 right-4" onClick={()=> setShowPassword(!showPassword)}>
          {
          showPassword ? <IoIosEyeOff/> :<IoIosEye/>
        }
          </span>
</label>
{errors.Password && <span className="text-red-700 font-bold">You must enter your Password</span>}

<button  data-aos="zoom-in" type="submit" className=" border font-caption text-white py-3 rounded-xl font-bold bg-blue-400">Log In</button>
</form>
{
  login && <span className="text-bold text-green-600 mt-5 w-full">{login}</span>
}

<div className="md:w-2/4">
<p data-aos="fade-left" className="mt-4 text-[16px] pb-4">Sign up as <Link to={'/join-as-employee'} className="underline  text-blue-400">Employee</Link> or <Link to={'/join-as-hr'} className="underline  text-blue-400">HR</Link> </p> <hr />
<h2 data-aos="fade-right" className="font-bold mt-4">Or Continue With:</h2>
<div className="flex justify-between mt-4 ju">
<button 
onClick={()=>  handleSocailLogin(googleLogin)}
 className="text-4xl"> <FcGoogle /> </button>
<button 
onClick={()=> handleSocailLogin(githubLogin)}
 className="text-4xl"> <FaGithub /> </button>
<button 
onClick={()=> handleSocailLogin(facebookLogin)}
 className="text-4xl text-blue-500"> <SiFacebook /> </button>
</div>
</div>
      </div>
     </div>
    </div>
  );
};

export default Login;