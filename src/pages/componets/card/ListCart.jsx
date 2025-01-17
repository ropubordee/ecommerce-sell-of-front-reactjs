import React from "react";
import { AlignLeft, Minus, Plus, Trash2 } from "lucide-react";
import userEcomStore from "../../store/Ecom-store";
import { Link } from "react-router-dom";

const ListCart = () => {
  const carts = userEcomStore((state) => state.carts);
  console.log(carts);
  const actionUpdateQuantity = userEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveCartProduct = userEcomStore(
    (state) => state.actionRemoveCartProduct
  );
  const getTotaPrice = userEcomStore((state) => state.getTotaPrice);
  const getItemDetails = userEcomStore((state) => state.getItemDetails);
  const totadetail = getItemDetails();
  const getTotaPriceVat = userEcomStore((state) => state.getTotaPriceVat)
  const {total, vat, totalWithVAT} = getTotaPriceVat()

  console.log(total,vat,totalWithVAT)
  return (
    <div className="bg-gray-100 rounded-md p-4">
      <div className="flex gap-4 mb-4">
        <AlignLeft size={36} />
        <p className="text-2xl font-bold">
          รายการสินค้า {carts.length} รายการ{" "}
        </p>
      </div>

      <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 ">
          <div className="border border-gray-800 "></div>
          {carts.map((item, index) => (
            <div key={index} className="w-full bg-white shadow rounded mb-4">
              <div className="p-4 flex flex-row gap-6 items-center w-full">
                {item.images && item.images.length > 0 ? (
                  <img
                    className="w-32 h-36 rounded-md object-cover"
                    src={item.images[0].url}
                    alt="image"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center">
                    No image
                  </div>
                )}
                <div className="w-full">
                  <h1 className="text-gray-900 font-bold text-xl text-center">
                    {item.title}
                  </h1>
                  <h1 className="text-gray-500 text-center mt-1">
                    {item.description}
                  </h1>
                </div>

                <div className="flex justify-between w-full gap-5">
                  <div className="flex flex-col justify-between items-center">
                    <div className="text-2xl text-gray-900 font-bold">ราคา</div>
                    <div className="text-center pb-2 text-gray-900 text-2xl">
                      ฿{item.price}
                    </div>
                  </div>
                  <div className="mt-[36px]">
                    X
                  </div>
                  <div className="flex flex-col items-center justify-between">
                    <div className="text-xl text-blue-600 font-bold">จำนวน</div>
                    <div className="flex flex-row">
                      <button
                        onClick={() =>
                          actionUpdateQuantity(item.id, item.count - 1)
                        }
                        className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                      >
                        <Minus size={20} />
                      </button>
                      <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-800 inline-flex items-center px-4 py-1 select-none">
                        {item.count}
                      </div>
                      <button
                        onClick={() =>
                          actionUpdateQuantity(item.id, item.count + 1)
                        }
                        className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col pb-4 justify-between">
                  <div className="text-center ">
                    <div className="text-gray-900 font-bold text-2xl">
                      ราคารวม
                    </div>

                    <div className="text-blue-500 text-xl font-bold">
                      ฿ {item.price * item.count}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-end pe-4 mb-4 ">
                    <button
                      onClick={() => actionRemoveCartProduct(item.id)}
                      className="text-red-500 pt-3  hover:text-red-700"
                    >
                      <Trash2 size={40} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
  <p className="text-3xl font-bold text-gray-800">ยอดรวม</p>
  {totadetail.map((item, index) => (
    <div key={index} className="w-full bg-white shadow-md rounded-md mb-4 p-4 flex justify-between items-center">
      <div className="text-gray-900 text-xl font-semibold">
        {item.name}
      </div>
      <div className="text-blue-500 text-xl font-bold text-right">
        ฿{item.totalPrice}
      </div>
    </div>
  ))}

  <div className="text-xl font-semibold text-red-600 flex justify-between">
    ยอดรวมก่อน VAT: <span className="text-black font-bold">฿{total.toFixed(2)}</span>
  </div>
  <div className="text-xl font-semibold text-gray-800 flex justify-between">
    VAT (7%): <span className="text-black font-bold">฿{vat.toFixed(2)}</span>
  </div>
  <div className="text-xl font-semibold text-gray-800 flex justify-between">
    ยอดรวมหลัง VAT: <span className="text-black font-bold">฿{totalWithVAT.toFixed(2)}</span>
  </div>

  <div className="flex justify-between text-xl font-bold text-gray-900 mt-4">
    <span>รวมสุทธิ</span>
    <span className="text-2xl text-green-600">฿{totalWithVAT.toFixed(2)}</span>
  </div>

  <div className="flex flex-col gap-4 mt-6">
    <Link to={"/"}>
      <button className="bg-red-500 w-full rounded-md text-white py-3 shadow-md hover:bg-red-600 transition duration-300">
        สั่งซี้อ
      </button>
    </Link>

    <Link to={"/shop"}>
      <button className="bg-gray-500 w-full rounded-md text-white py-3 shadow-md hover:bg-gray-600 transition duration-300">
        แก้ไขรายการ
      </button>
    </Link>
  </div>
</div>


      </div>
    </div>
  );
};

export default ListCart;
