import { create } from "zustand";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },

  actionAddtoCart: async (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    console.log(updateCart);
    const uniqe = _.unionWith(updateCart, _.isEqual);
    // console.log('Click add in Zustand',carts)

    set({ carts: uniqe });
  },

  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('Update Click',productId,newQuantity)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  actionRemoveCartProduct: (productId) => {
    console.log("remove", productId);
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },

  getItemDetails: () => {
    return get().carts.map((item) => ({
      name: item.title,
      totalPrice: item.price * item.count,
    }));
  },

  getTotaPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  actionLogin: async (form) => {
    const res = await axios.post("https://ecommerce-sell-of-backend-nodejs.vercel.app/api/login", form);
    console.log(res.data.token);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },

  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },

  clearCart: () => {
    set({ carts: [] });
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const userEcomStore = create(persist(ecomStore, usePersist));

export default userEcomStore;
