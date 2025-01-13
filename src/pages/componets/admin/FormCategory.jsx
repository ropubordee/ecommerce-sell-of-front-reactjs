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
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-400">Add Category</button>
      </form>

      <hr />
      <ul className="list-none">
        {categoies.map((item, index) => (
          <li className="flex justify-between my-2" key={index}>
            <span>{item.name}</span>
            <button
            className=""
            onClick={()=> handleRemove(item.id)}
            ><Trash2/></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
