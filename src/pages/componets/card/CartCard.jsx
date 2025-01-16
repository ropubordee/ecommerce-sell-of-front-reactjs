import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import userEcomStore from "../../store/Ecom-store";

const CartCard = () => {
  const carts = userEcomStore((state) => state.carts);
  console.log(carts);
  const actionUpdateQuantity = userEcomStore(
    (state) => state.actionUpdateQuantity
  );

  return (
    <div>
      <div className="text-gray-700 font-bold text-xl text-center pb-4 ">
        ตะกร้าสินค้า
      </div>

      {carts.map((item, index) => (
        <div key={index} className="w-full bg-white shadow rounded mb-4">
          <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center">
            No image
          </div>
          <div className="flex justify-end pe-4 ">
            <button className="text-red-600 pt-3">
              <Trash2 />
            </button>
          </div>
          <div className="p-4 flex flex-col items-center w-full">
            <h1 className="text-gray-800 font-bold text-xl text-center">
              {item.title}
            </h1>
            <h1 className="text-gray-400 text-center mt-1">
              {item.description}
            </h1>
            <p className="text-center text-gray-800 mt-1">
              ราคา : {item.price} ฿
            </p>
            <div className="inline-flex items-center mt-2">
              <button
                onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
              >
                <Minus />
              </button>
              <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                {item.count}
              </div>
              <button
                onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
              >
                <Plus />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between w-full">
        <div>รวม</div>
        <div>120 ฿</div>
      </div>
      <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
        ดำเนินการ
      </button>
    </div>
  );
};

export default CartCard;
