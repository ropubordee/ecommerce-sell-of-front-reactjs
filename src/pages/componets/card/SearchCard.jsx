import React, { useEffect, useState } from "react";
import userEcomStore from "../../store/Ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { nullFormat } from "numeral";
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProduct = userEcomStore((state) => state.getProduct);
  const products = userEcomStore((state) => state.products);
  const actionSearchFilters = userEcomStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = userEcomStore((state) => state.getCategory);
  const categories = userEcomStore((state) => state.categories);
  const [text, setText] = useState("");
  const [categorySelecated, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([0, 30000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  const handleCheck = (e) => {
    // console.log(e.target.value)

    const inCheck = e.target.value;
    const inState = [...categorySelecated];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };
  console.log(categorySelecated);

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    console.log(value);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">ค้นหาสินค้า</h1>
        <input
          className="mt-4 border border-gray-300 rounded-md w-full p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="ค้นหาสินค้า..."
        />
      </div>
      <hr className="border-gray-200" />

      <div>
        <h2 className="text-xl font-semibold text-gray-700">หมวดหมู่สินค้า</h2>
        <div className="space-y-2 mt-4">
          {categories.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <input
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                onChange={handleCheck}
                value={item.id}
                type="checkbox"
              />
              <label className="text-gray-700">{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-gray-200" />

      <div>
        <h2 className="text-xl font-semibold text-gray-700">ค้นหาราคา</h2>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>
              ต่ำสุด:{" "}
              <span className="font-medium">{numberFormat(price[0])}</span>
            </span>
            <span>
              สูงสุด:{" "}
              <span className="font-medium">{numberFormat(price[1])}</span>
            </span>
          </div>
          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={10000}
            defaultValue={[0, 30000]}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
