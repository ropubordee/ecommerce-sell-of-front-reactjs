import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import userEcomStore from "../store/Ecom-store";
import { saveOrder } from "../api/user";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

const token = userEcomStore((state)=>state.token)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,

      redirect: "if_required",
    });

    if (payload.error) {
      setMessage(payload.message);
    } else {
        saveOrder(token,payload)
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement  id="payment-element" options={paymentElementOptions} />
      <button
        className={`w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-300  ${
          isLoading || !stripe || !elements
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text" className="flex items-center justify-center">
          {isLoading ? (
            <div
              className="spinner border-t-transparent border-4 border-white rounded-full w-5 h-5 animate-spin"
              id="spinner"
            ></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
