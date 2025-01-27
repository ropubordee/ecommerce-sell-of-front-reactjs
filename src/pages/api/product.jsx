import axios from "axios";

export const createProduct = async (token, form) => {
  return axios.post("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listProduct = async (count = 20) => {
  return axios.get("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/products/" + count);
};

export const readProduct = async (token, id) => {
  return axios.get("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token, id) => {
  return axios.delete("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  return axios.put("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, data) => {
  return axios.post(
    "https://ecommerce-sell-of-backend-nodejs.vercel.app/api/images",
    {
      image: data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  return axios.post(
    "https://ecommerce-sell-of-backend-nodejs.vercel.app/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (arg) => {
  return axios.post("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/search/filters/", arg);
};

export const listProductBy = async (sort, orderBy, limit) => {
  return axios.post("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/productby", {
    sort,
    orderBy,
    limit,
  });
};
