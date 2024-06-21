import { loadStripe } from "@stripe/stripe-js";
import PackageCard1 from "../../components/PackageCard1";
import PackageCard2 from "../../components/PackageCard2";
import PackageCard3 from "../../components/PackageCard3";
import useRoll from "../../hooks/useRoll";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Packages = () => {
  const [role] = useRoll();
  const packages = role[3];
  const [pack, setPack] = useState(false);
  const [price, setPrice] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [plan , setPlan] = useState(null)

  const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

  const handleIncreasePack = (selectedPack, price, member) => {
    if (selectedPack === packages) {
      return toast.warning('This is Your current plan');
    }
    setPack(true);
    setPrice(price);
    setPlan(selectedPack)
  };

  useEffect(() => {
    if (price !== null) {
      axios.post('http://localhost:5000/payment-intent', { price })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(error => toast.error('Error fetching client secret'));
    }
  }, [price]);
  

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pt-24 px-16">
      {pack ? (
        clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckOutForm clientSecret={clientSecret} plan={plan} />
          </Elements>
        )
      ) : (
        <>
          <h2 className="text-3xl font-semibold text-center underline">Select a Package:</h2>
          <h2>Your Current Package: {packages}</h2>
          <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            <div className="h-fit cursor-pointer" onClick={() => handleIncreasePack('basic', 5, 5)}>
              <PackageCard1 />
            </div>
            <div className="h-fit cursor-pointer" onClick={() => handleIncreasePack('premium', 15, 20)}>
              <PackageCard3 />
            </div>
            <div className="h-fit cursor-pointer" onClick={() => handleIncreasePack('standard', 8, 10)}>
              <PackageCard2 />
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Packages;
