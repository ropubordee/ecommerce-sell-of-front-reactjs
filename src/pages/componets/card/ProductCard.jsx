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
      {item.quantity < 1 ? (
       <div className="border rounded-md shadow-md p-2 w-48">
       <div>
         {item.images && item.images.length > 0 ? (
           <div className="relative">
             <img
               src={item.images[0].url}
               className="rounded-md w-full h-24 object-cover hover:scale-110 hover:duration-200"
             />
             {item.quantity < 1 && (
               <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white py-1 px-5 rounded-full text-xl font-bold">
                 สินค้าหมด
               </p>
             )}
           </div>
         ) : (
           <div className="w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow-md">
             No Image
           </div>
         )}
       </div>
     
       <div className="py-2">
         <p className="text-xl truncate">{item.title}</p>
         <p className="text-sm text-gray-500 truncate">{item.description}</p>
         <div className="flex justify-between py-1">
           <p className="text-sm truncate">จำนวนสินค้า</p>
           <p className="text-sm truncate">{item.quantity} ชิ้น</p>
         </div>
       </div>
     
       <div className="flex justify-between items-center">
         <span className="text-xl font-bold">
           {numberFormat(item.price)} ฿
         </span>
       </div>
     </div>
     
      ) : (
        <div className="border rounded-md shadow-md p-2 w-48">
          <div>
            {item.images && item.images.length > 0 ? (
              <div className="relative">
                <img
                  src={item.images[0].url}
                  className="rounded-md w-full  h-24 object-cover hover:scale-110 hover:duration-200"
                />
                
              </div>
            ) : (
              <div className="w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow-md">
                No Image
              </div>
            )}
          </div>

          <div className="py-2">
            <p className="text-xl truncate">{item.title}</p>
            <p className="text-sm text-gray-500 truncate">{item.description}</p>
            <div className="flex justify-between py-1">
              <p className="text-sm truncate">จำนวนสินค้า</p>
              <p className="text-sm truncate">{item.quantity} ชิ้น</p>
            </div>
          </div>

          <div className="flex justify-between items-center ">
            <span className="text-xl font-bold">
              {" "}
              {numberFormat(item.price)} ฿
            </span>
            <button
              onClick={() => actionAddtoCart(item)}
              className="bg-blue-400 rounded-md p-2 hover:bg-blue-500 shadow-md"
            >
              <ShoppingCart />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
