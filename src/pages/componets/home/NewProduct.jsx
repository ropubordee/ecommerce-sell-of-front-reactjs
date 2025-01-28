import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from '../card/ProductCard'
import SwiperProduct from "../../utils/SwiperProduct";
import { SwiperSlide } from "swiper/react";

const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("createdAt", "desc", 11)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };



  return (
    <SwiperProduct>
      {data?.map((item, index) => (
        <SwiperSlide key={index}>

        <ProductCard item={item} />
        </SwiperSlide>
      ))}
    </SwiperProduct>
  );
};

export default NewProduct;
