import React from "react";
import ContentCarousel from "./componets/home/ContentCarousel";
import BestSeller from "./componets/home/BestSeller";
import NewProduct from "./componets/home/NewProduct";

const Home = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="mb-8">
        <ContentCarousel />
      </div>

      <div className="mb-8">
        <p className="text-3xl font-bold text-center text-gray-800 tracking-wider mb-6">
          สินค้าขายดี
        </p>
        <div className="max-w-6xl mx-auto">
          <BestSeller />
        </div>
      </div>

      <div>
        <p className="text-3xl font-bold text-center text-gray-800 tracking-wider mb-6">
          สินค้าใหม่
        </p>
        <div className="max-w-6xl mx-auto">
          <NewProduct />
        </div>
      </div>
    </div>
  );
};

export default Home;
