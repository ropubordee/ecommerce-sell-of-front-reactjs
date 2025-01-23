import React, { useState } from "react";
import { toast } from "react-toastify";
import userEcomStore from "../store/Ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const actionLogin = userEcomStore((state) => state.actionLogin);
  // const user = userEcomStore((state) => state.user);
  // console.log(user)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ฟังช์ไม่ให้รีเซ็ตหน้า
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);

      toast.success("Welcome Back");
    } catch (error) {
      const errMsg = error.response?.data?.message;
      toast.error(errMsg);
      console.log(error);
    }

  };
  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate('/admin');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
      Login 
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6">
  
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
          placeholder="Enter your email"
          onChange={handleOnchange}
        />
      </div>

 
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
          placeholder="Enter your password"
          onChange={handleOnchange}
        />
      </div>

  
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Login
      </button>

  
      <div className="text-sm text-center text-gray-600 mt-4">
      
        <a
          href="/register"
          className="text-blue-500 hover:underline hover:text-blue-700 font-medium"
        >
          Sign up
        </a>
      </div>
    </form>
  </div>
</div>

  );
};

export default Login;
