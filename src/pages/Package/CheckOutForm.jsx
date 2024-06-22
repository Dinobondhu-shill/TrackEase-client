import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useRoll from '../../hooks/useRoll';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = ({ clientSecret, plan }) => {
  const [role] = useRoll();
 const email = role[5]
  const hrName = role[4];
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setErrorMessage('Stripe.js has not loaded yet. Please try again later.');
      setIsProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrorMessage('Please enter your card details.');
      setIsProcessing(false);
      return;
    }

    try {
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (paymentMethodError) {
        setErrorMessage(paymentMethodError.message);
        setIsProcessing(false);
        return;
      }

      console.log('[PaymentMethod]', paymentMethod);

      const { error: intentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: hrName || 'Anonymous',
          },
        },
      });

      if (intentError) {
        setErrorMessage(intentError.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        const response = await axios.patch(`https://track-ease-server.vercel.app/change-packages/${email}`, { plan });
        console.log('Response data:', response.data);
        if (response.data.modifiedCount === 1) {
          Swal.fire({
            icon: 'success',
            title: 'Your Package has been upgraded',
            showConfirmButton: false,
            timer: 2500,
          });
          setErrorMessage(null); // Clear any previous error messages
          navigate('/');
        } else {
          setErrorMessage('Failed to update the package. Please try again.');
        }
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 my-4 border-gray-300 p-4 rounded-md w-96 mx-auto">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        className={`border w-full mx-auto my-3 py-2 px-3 rounded-md bg-sky-400 text-secondary font-semibold ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        type="submit"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </form>
  );
};

export default CheckOutForm;
