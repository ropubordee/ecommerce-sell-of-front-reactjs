import axios from "axios";

export const currentUser = async (token) =>
  await axios.post(
    "https://ecommerce-sell-of-backend-nodejs.vercel.app/api/current-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currenAdmin = async (token) => {
  return await axios.post('https://ecommerce-sell-of-backend-nodejs.vercel.app/api/current-admin', {}, {
    headers : {
     Authorization: `Bearer ${token}`
    }
  })
};
