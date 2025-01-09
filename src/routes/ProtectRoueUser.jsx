import React, { useEffect, useState } from "react";
import userEcomStore from "../pages/store/Ecom-store";
import { currentUser } from "../pages/api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRoueUser = ({ element  }) => {
  const [ok, setOk] = useState(false);
  const user = userEcomStore((state) => state.user);
  const token = userEcomStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
       currentUser(token)
       .then((res)=> setOk(true))
       .catch((err) =>setOk(false))
    }
  },[]);

  return  ok ? element : <LoadingToRedirect/>
};

export default ProtectRoueUser;
