
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import JoinHR from "./JoinHR";

const SignUp = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

  return (
    <Elements stripe={stripePromise}>
      <JoinHR />
    </Elements>
  );
};

export default SignUp;
