import React, { useEffect, useState } from "react";
import userEcomStore from "../pages/store/Ecom-store";
import { currenAdmin } from "../pages/api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRoueAdmin = ({ element  }) => {
  const [ok, setOk] = useState(false);
  const user = userEcomStore((state) => state.user);
  const token = userEcomStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
        currenAdmin(token)
       .then((res)=> setOk(true))
       .catch((err) =>setOk(false))
    }
  },[]);

  return  ok ? element : <LoadingToRedirect/>
};

export default ProtectRoueAdmin;
