import { create } from "zustand";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from 'lodash';

const ecomStore = (set,get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts : [],

  actionAddtoCart : async(product)=>{
    
    const carts = get().carts 
    const updateCart = [...carts,{...product,count: 1}]
    console.log(updateCart)
    const uniqe = _.unionWith(updateCart,_.isEqual)
    // console.log('Click add in Zustand',carts)
    
    
    set({carts : uniqe})

  },

  actionUpdateQuantity : (productId,newQuantity)=>{
    console.log('Update Click',productId,newQuantity)
  },

  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:5000/api/login", form);
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
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const userEcomStore = create(persist(ecomStore, usePersist));

export default userEcomStore;
