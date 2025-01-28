import React, { useEffect } from "react";
import ProductCard from "./componets/card/ProductCard";
import userEcomStore from "./store/Ecom-store";
import SearchCard from "./componets/card/SearchCard";
import CartCard from "./componets/card/CartCard";

const Shop = () => {
  const getProduct = userEcomStore((state) => state.getProduct);
  const products = userEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">

    <div className="w-1/4 p-4 bg-white shadow-md h-full">
      <h2 className="text-xl font-bold text-gray-700 mb-4">ค้นหาสินค้า</h2>
      <SearchCard />
    </div>
  

    <div className="w-1/2 p-6 h-full overflow-y-auto bg-gray-50">
      <p className="text-2xl font-bold mb-6 text-center text-gray-800">
        สินค้าทั้งหมด
      </p>
      <div className="grid grid-cols-2 gap-6">
        {products.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
    </div>
  

    <div className="w-1/4 p-4 bg-white shadow-md h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-700 mb-4">ตะกร้าสินค้า</h2>
      <CartCard />
    </div>
  </div>
  
  );
};

export default Shop;
