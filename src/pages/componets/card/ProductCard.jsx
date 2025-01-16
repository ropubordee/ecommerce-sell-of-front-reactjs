import React from "react";
import { ShoppingCart } from "lucide-react";
import userEcomStore from "../../store/Ecom-store";

const ProductCard = ({ item }) => {

  const actionAddtoCart = userEcomStore((state)=> state.actionAddtoCart)

  return (
    <div className="border rounded-md shadow-md p-2 w-48">
      <div>
        {item.images && item.images.length > 0 ? (
          <img src={item.images[0].url} className="rounded-md w-full  h-24 object-cover hover:scale-110 hover:duration-200" />
        ) : (
          <div className="w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow-md">
            No Image
          </div>
        )}
      </div>

      <div className="py-2">
        <p className="text-xl">{item.title}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="flex justify-between items-center ">
        <span className="text-xl font-bold"> {item.price} ฿</span>
        <button 
        onClick={()=>actionAddtoCart(item)}
        className="bg-blue-400 rounded-md p-2 hover:bg-blue-500 shadow-md">
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
