import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../firebase/FirebaseProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Select from "react-select";
import Lottie from "lottie-react";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";
import lottiejson from "../../../public/joinhr.json";

const JoinHR = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [startDate, setStartDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const options = [
    { value: "basic", label: "5 members for $5" },
    { value: "standard", label: "10 members for $8" },
    { value: "premium", label: "20 members for $15" }
  ];

  const handleJoinEmployee = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    const form = event.target;
    const name = form.fullName.value.trim();
    const email = form.email.value.trim();
    const role = "hr";
    const image = form.image.files[0];
    const company = form.companyName.value.trim();
    const companyLogo = form.companyLogo.files[0];
    const password = form.password.value.trim();
    const birthday = startDate;
    const packages = selectedOption.value;

    try {
      const imageUrl1 = await uploadImage(image);
      const imageUrl2 = await uploadImage(companyLogo);

      const hr = {
        name,
        email,
        role,
        birthday,
        imageUrl1,
        imageUrl2,
        password,
        company,
        packages
      };

      if (!stripe || !elements) {
        throw new Error("Stripe.js has not loaded yet. Please try again later.");
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        setErrorMessage('Please enter your card details.');
        setIsProcessing(false);
        return;
      }
    
      
      
    
      // Create payment intent on server
      const paymentIntentResponse = await axios.post("https://track-ease-server.vercel.app/payment-intent", {
        price : getPackageAmount(packages)
      });
      const clientSecret = paymentIntentResponse.data.clientSecret;

      // Confirm card payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name || "Anonymous"
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        console.log(paymentIntent);
        await createUser(email, password);
        await axios.post("https://track-ease-server.vercel.app/users", hr);
        await updateUserProfile(name, imageUrl1);
        navigate(location?.state || "/");
        Swal.fire("You are now logged in");
      } else {
        throw new Error("Payment was not successful. Please try again.");
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Hosting_Key}`, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
    return response.data.data.url;
  };

  const getPackageAmount = (packageName) => {
    switch (packageName) {
      case "basic":
        return 5;
      case "standard":
        return 8;
      case "premium":
        return 15;
      default:
        return 0;
    }
  };
;

  return (
    <div className="pt-16 flex flex-row-reverse gap-5 lg:px-20">
      <div className="w-1/3 flex flex-col justify-center">
        <h3 className="mt-10 font-semibold text-center text-2xl">Wanna grow your company with us? <br /> YOU'RE WELCOME!</h3>
        <Lottie animationData={lottiejson} loop={true} />
      </div>
      {/* Sign Up Form */}
      <div className="w-2/3 mt-10 space-y-4">
        <h3 className="font-medium text-2xl text-center underline mb-5">Sign Up as a HR</h3>
        <form onSubmit={handleJoinEmployee}>
          {/* Full Name and Image */}
          <div className="flex">
            <label className="form-control w-full">
              <span className="label-text">Enter Your Full Name*</span>
              <input type="text" placeholder="Type here" name="fullName" className="input input-bordered w-full max-w-xs" required />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Select Your Photo*</span>
              <input type="file" name="image" className="file-input file-input-bordered file-input-sm w-full max-w-xs" required />
            </label>
          </div>
          {/* Email and Password */}
          <div className="flex">
            <label className="form-control w-full">
              <span className="label-text">Enter Your Email Address*</span>
              <input type="text" placeholder="Type here" name="email" className="input input-bordered w-full max-w-xs" required />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Enter A Password*</span>
              <input type="password" placeholder="Type here" name="password" className="input input-bordered w-full max-w-xs" required />
            </label>
          </div>
          {/* Date of Birth and Package */}
          <div className="flex">
            <label className="form-control w-full my-5">
              <span className="label-text">Select Your date of birth*</span>
              <ReactDatePicker
                placeholderText="MM/DD/YYYY"
                className="border py-3 pr-28 pl-2 rounded-xl"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
              />
            </label>
            <label className="form-control w-full my-5">
              <span className="label-text">Select a Package*</span>
              <Select
                className="max-w-xs"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                required
              />
            </label>
          </div>
          {/* Company Name and Logo */}
          <div className="flex">
            <label className="form-control w-full">
              <span className="label-text">Enter Your Company Name*</span>
              <input type="text" placeholder="Type here" name="companyName" className="input input-bordered w-full max-w-xs" required />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Select Your Company Logo*</span>
              <input type="file" name="companyLogo" className="file-input file-input-bordered file-input-sm w-full max-w-xs" required />
            </label>
          </div>
          {/* Card Details */}
          <div className="my-6">
            <label className="form-control w-full">
              <span className="label-text">Enter Your Card Details*</span>
              <div className="border p-2 rounded">
                <CardElement />
              </div>
            </label>
          </div>
          {/* Error Message */}
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          {/* Submit Button */}
          <div className="mr-16">
            <input type="submit" value="Sign Up" className="border py-2 cursor-pointer border-[#92e0e3] w-full my-6 rounded-lg" disabled={isProcessing} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinHR;
