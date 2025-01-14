import React, { useEffect, useState } from "react";
import userEcomStore from "../../store/Ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
  const [price, setPrice] = useState([1000, 30000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory;
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
    <div>
      <h1 className="text-xl font-bold pb-4"> ค้นหาสินค้า</h1>
      <input
        className="border rounded-md w-full mb-4 px-2"
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้า..."
      />
      <hr />

      <div>
        <h1 className="text-2xl font-bold">หมวดหมู่สินค้า</h1>

        <div>
          {categories.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <input onChange={handleCheck} value={item.id} type="checkbox" />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />

      <div>
        <h1>ค้นหาราคา</h1>
        <div>
          <div className="flex justify-between">
            <span>ต่ำสุด : {price[0]}</span>
            <span>สูงสุด : {price[1]}</span>
          </div>

          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={10000}
            defaultValue={[1000, 30000]}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
