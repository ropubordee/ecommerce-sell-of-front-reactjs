import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/Ecom-store";
import { createProduct, readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "Razer Huntsman Elite Mechanical Keyboard",
  description: "desc",
  price: 200,
  quantity: 10,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      console.log(res);
      setForm(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      console.log(res);
      toast.success(`แก้ไข ${res.data.title} สำเร็จ`);
      navigate('/admin/product')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Title"
          name="title"
        />
        <input
          className="border"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Description"
          name="description"
        />
        <input
          type="number"
          className="border"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Price"
          name="price"
        />
        <input
          className="border"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Quantity"
          name="quantity"
        />
        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            Please Select
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />

        <UploadFile form={form} setForm={setForm} />

        <button className="bg-green-600">แก้ไขสินค้า</button>

        <hr />
      </form>
    </div>
  );
};

export default FormEditProduct;
