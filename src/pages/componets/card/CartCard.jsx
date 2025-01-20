import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import userEcomStore from "../../store/Ecom-store";
import { Link } from 'react-router-dom'
const CartCard = () => {
  const carts = userEcomStore((state) => state.carts);
  console.log(carts);
  const actionUpdateQuantity = userEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveCartProduct = userEcomStore(
    (state) => state.actionRemoveCartProduct
  );
  const getTotaPrice = userEcomStore((state) => state.getTotaPrice);

  return (
    <div>
      <div className="text-gray-700 font-bold text-xl text-center pb-4 ">
        ตะกร้าสินค้า
      </div>

      {carts.map((item, index) => (
        <div key={index} className="w-full bg-white shadow rounded mb-4 relative">
          {item.images && item.images.length > 0 ? (
            <div className="flex justify-center  ">
              <img
                className="w-32 h-36 rounded-md object-cover"
                src={item.images[0].url}
                alt="image"
              />
            </div>
          ) : (
            <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center">
              No image
            </div>
          )}
            <div className="border border-gray-800" ></div>
          <div className="p-4 flex flex-col items-center w-full">
            <h1 className="text-gray-800 font-bold text-xl text-center">
              {item.title}
            </h1>
          <div className="flex justify-end pe-4  ">
            <button
               onClick={() => actionRemoveCartProduct(item.id)}
              className="text-red-600 pt-3 absolute top-0 right-3  "
            >
              <Trash2 size={24} />
            </button>
          </div>
            <h1 className="text-gray-400 text-center mt-1">
              {item.description}
            </h1>
            <p className="text-center text-gray-800 mt-1">
              ราคา : {item.price * item.count} ฿
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
        <div>{getTotaPrice()} ฿</div>
      </div>
      <div className="text-red-500 text-end text-sm "> ราคานี้ยังไม่รวม Vat 7%</div>
      <Link to={'/cart'}>
      <button 
      className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
        ดำเนินการชำระเงิน
      </button>
        </Link>
    </div>
  );
};

export default CartCard;
