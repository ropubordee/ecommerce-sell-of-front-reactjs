import axios from "axios";

export const payment = async (token) =>
  await axios.post(
    "https://ecommerce-sell-of-backend-nodejs.vercel.app/api/user/create-payment-intent",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
