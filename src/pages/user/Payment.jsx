import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import userEcomStore from "../store/Ecom-store";
import { payment } from "../api/stripe";
import CheckoutForm from "../componets/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51QjBNaBr75o1Azj8AWmEU5kyVv21q9U4Ft11fkk0Vgtb96Lhwk88h5jHABX9DNxGPz2AQLLYywooruRfYPwPiyKG005eQ1OSIq"
);

const Payment = () => {
  const token = userEcomStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
      .then((res) => {
        console.log(res);
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  useEffect(() => {}, []);

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
