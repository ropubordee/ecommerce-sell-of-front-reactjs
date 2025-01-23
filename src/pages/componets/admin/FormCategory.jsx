import React, { useEffect, useState } from "react";
import userEcomStore from "../../store/Ecom-store";
import { createCategory, listCategory, removeCategory } from "../../api/Category";
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';

const FormCategory = () => {
  const token = userEcomStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categoies, setCategories] = useState([]);
  const categoies = userEcomStore((state)=> state.categories)
  const getCatgeory = userEcomStore((state)=> state.getCategory)

  useEffect(() => {
    getCatgeory(token);
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please fill data");
    }
    try {
      const res = await createCategory(token, { name });

      toast.success(`Add Categort ${res.data.name} success`);
      getCatgeory(token)
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async(id) =>{
    console.log(id)
    try {
      const res = await removeCategory(token,id)
      console.log(res)
      toast.success(`Deleted ${res.data.name} success`)
      getCatgeory(token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
      Category Management
    </h1>
    <form
      className="flex items-center gap-4 mb-6"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter category name"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        Add Category
      </button>
    </form>
  
    <hr className="my-4 border-gray-300" />
  
    <ul className="list-none space-y-4">
      {categoies.map((item, index) => (
        <li
          className="flex justify-between items-center bg-gray-50 px-4 py-3 border border-gray-200 rounded-md shadow-sm"
          key={index}
        >
          <span className="text-gray-800 font-medium">{item.name}</span>
          <button
            className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-md"
            onClick={() => handleRemove(item.id)}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </li>
      ))}
    </ul>
  </div>
  
  );
};

export default FormCategory;
