import axios from "axios";

export const getOrdersAdmin = async (token) => {
  return axios.get("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const changeOrderStatus = async (token, orderId, orderStatus) => {
  return axios.put(
    "https://ecommerce-sell-of-backend-nodejs.vercel.app/api/admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getListAllUsers = async (token) => {
  return axios.get("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const changeUserStatus = async (token,value) => {
  return axios.post("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/change-status",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token,value) => {
  return axios.post("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/change-role",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
