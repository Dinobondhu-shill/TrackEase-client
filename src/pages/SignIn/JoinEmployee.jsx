import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const JoinEmployee = () => {
  const [startDate, setStartDate] = useState(null);

  const handleJoinEmployee = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.fullName.value;
    const email = form.email.value;
    const role = 'employee';
    const password= form.password.value
    const birthday = startDate;
    const employee = {name, email, role, password, birthday}
    console.log(employee)
  }

return (
<div className="pt-16">
  {/* sign in form */}
  <div>
    <form onSubmit={handleJoinEmployee}>
      {/* full name field */}
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Enter Your Full Name*</span>
        </div>
        <input type="text" placeholder="Type here" name="fullName" className="input input-bordered w-full max-w-xs" required />
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
       <div>
       <ReactDatePicker placeholderText="Select Your date of birth" className="border py-3 px-14 rounded-xl" selected={startDate} onChange={(date) => setStartDate(date)} />
       </div>
      </label>
      <input type="submit" value="Sign Up" className="border border-[#92e0e3] mx-auto px-4 py-2 rounded-lg "/>
    </form>
  </div>
</div>
);
};

export default JoinEmployee;