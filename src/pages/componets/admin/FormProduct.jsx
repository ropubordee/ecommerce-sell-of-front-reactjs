import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/Ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/datefrom";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

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
      const res = await createProduct(token, form);
      console.log(res);
      setForm(initialState);
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDalete = async (id) => {
    console.log(id);
    if (window.confirm("ยืนยันการลบ")) {
      try {
        const res = await deleteProduct(token, id);
        console.log(res);
        toast.success("Delete สินค้าเรียบร้อยแล้ว");
        getProduct();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-gray-700 mb-6">เพิ่มข้อมูลสินค้า</h1>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.title}
          onChange={handleOnChange}
          placeholder="ชื่อสินค้า"
          name="title"
        />
        <textarea
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.description}
          onChange={handleOnChange}
          placeholder="รายละเอียดสินค้า"
          name="description"
        />
        <input
          type="number"
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.price}
          onChange={handleOnChange}
          placeholder="ราคา"
          name="price"
        />
        <input
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="จำนวนสินค้า"
          name="quantity"
        />
        <select
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            กรุณาเลือกหมวดหมู่
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
  
      <UploadFile form={form} setForm={setForm} />
  
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md font-medium hover:bg-green-600 hover:scale-105 transition duration-200"
        >
          เพิ่มสินค้า
        </button>
      </div>
  
      <hr className="my-8 border-gray-300" />
  
      <table className="table-auto w-full text-left border-collapse">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">รูปภาพ</th>
            <th className="px-4 py-2">ชื่อสินค้า</th>
            <th className="px-4 py-2">รายละเอียด</th>
            <th className="px-4 py-2">ราคา</th>
            <th className="px-4 py-2">จำนวน</th>
            <th className="px-4 py-2">จำนวนที่ขายได้</th>
            <th className="px-4 py-2">วันที่อัพเดต</th>
            <th className="px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {item.images.length > 0 ? (
                  <img
                    className="w-16 h-16 rounded-md object-cover shadow-sm"
                    src={item.images[0].url}
                    alt="Product"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center shadow-sm text-gray-500">
                    ไม่มีรูปภาพ
                  </div>
                )}
              </td>
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">{numberFormat(item.price)}</td>
              <td className="px-4 py-2 text-center">{item.quantity}</td>
              <td className="px-4 py-2 text-center">{item.sold}</td>
              <td className="px-4 py-2">{dateFormat(item.updatedAt)}</td>
              <td className="px-4 py-2 flex gap-2">
                <Link
                  to={`/admin/product/${item.id}`}
                  className="bg-yellow-400 text-white px-3 py-1 rounded-md shadow-md hover:bg-yellow-500 hover:scale-105 transition duration-200"
                >
                  <Pencil />
                </Link>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600 hover:scale-105 transition duration-200"
                  onClick={() => handleDalete(item.id)}
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  </div>
  
  );
};

export default FormProduct;
