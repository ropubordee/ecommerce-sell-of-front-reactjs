import { create } from "zustand";
import axios from "axios";
import {persist,createJSONStorage} from 'zustand/middleware'

const ecomStore = (set) => ({
  user: null,
  token: null,
  actionLogin: async(form) => {
    const res = await axios.post("http://localhost:5000/api/login", form);
    console.log(res.data.token)
    set({
        user : res.data.payload,
        token : res.data.token
    })
    return res;
  },
});

const usePersist ={
    name : 'ecom-store',
    storage : createJSONStorage(()=>localStorage)
}

const userEcomStore = create(persist(ecomStore,usePersist) );

export default userEcomStore;
