import React from "react";
import { ShoppingCart } from "lucide-react";
import userEcomStore from "../../store/Ecom-store";
import { numberFormat } from "../../utils/number";
import * as motion from "motion/react-client";

const ProductCard = ({ item }) => {
  const actionAddtoCart = userEcomStore((state) => state.actionAddtoCart);

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    }}
  >
    <div className="border rounded-lg shadow-lg p-4 w-56 bg-white hover:shadow-xl transform hover:scale-105 transition duration-300">
   
      <div className="relative">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="rounded-md w-full h-32 object-cover hover:scale-110 transition duration-300"
          />
        ) : (
          <div className="w-full h-32 bg-gray-200 rounded-md text-center flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        {item.quantity < 1 && (
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white py-1 px-4 rounded-full text-sm font-bold shadow-lg">
            สินค้าหมด
          </p>
        )}
      </div>
  
    
      <div className="py-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{item.title}</h3>
        <p className="text-sm text-gray-500 truncate">{item.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">จำนวนสินค้า</span>
          <span className={`text-sm font-bold ${item.quantity < 1 ? "text-red-500" : "text-gray-800"}`}>
            {item.quantity} ชิ้น
          </span>
        </div>
      </div>
  
 
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-blue-600">{numberFormat(item.price)} ฿</span>
        {item.quantity > 0 && (
          <button
            onClick={() => actionAddtoCart(item)}
            className="bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600 transition duration-300 shadow-md flex items-center gap-1"
          >
            <ShoppingCart />
            <span className="text-sm font-medium">เพิ่ม</span>
          </button>
        )}
      </div>
    </div>
  </motion.div>
  
  );
};

export default ProductCard;
