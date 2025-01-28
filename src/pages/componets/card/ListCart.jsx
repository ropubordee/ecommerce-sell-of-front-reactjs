import React, { useState } from "react";
import { AlignLeft, Minus, Plus, Trash2 } from "lucide-react";
import userEcomStore from "../../store/Ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";

const ListCart = () => {
  const cart = userEcomStore((state) => state.carts);

  const actionUpdateQuantity = userEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveCartProduct = userEcomStore(
    (state) => state.actionRemoveCartProduct
  );
  const getItemDetails = userEcomStore((state) => state.getItemDetails);
  const totadetail = getItemDetails();
  const getTotaPrice = userEcomStore((state) => state.getTotaPrice);
  const user = userEcomStore((state) => state.user);
  const token = userEcomStore((state) => state.token);
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);

  const setTimedisable = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000);
  };

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("เพิ่มลงตะกร้าสำเสร็จ");
        navigate("/checkout");
      })
      .catch((error) => {
        console.log(error);
        toast.warning(error.response.data.message);
      });
  };

  return (
    <div className="bg-gray-100 rounded-md p-4">
      <div className="flex gap-4 mb-4">
        <AlignLeft size={36} />
        <p className="text-2xl font-bold">รายการสินค้า {cart.length} รายการ </p>
      </div>

      <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 ">
          <div className="border border-gray-800 "></div>
          {cart.map((item, index) => (
            <div
              key={index}
              className="w-full bg-white shadow-lg rounded-lg p-6 mb-6"
            >
              <div className="flex flex-wrap items-center gap-6">
                {item.images && item.images.length > 0 ? (
                  <img
                    className="w-32 h-36 rounded-md object-cover"
                    src={item.images[0].url}
                    alt="image"
                  />
                ) : (
                  <div className="w-32 h-36 bg-gray-200 flex items-center justify-center rounded-md">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 ">
                    {item.description}
                  </p>
                  <div className="mt-3">
                    <span className="text-gray-700 font-medium">Price:</span>{" "}
                    <span className="text-blue-600 font-bold text-lg text-nowrap">
                      ฿{numberFormat(item.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <button
                      disabled={item.count <= 1}
                      onClick={() =>
                        actionUpdateQuantity(item.id, item.count - 1)
                      }
                      className="w-8 h-8 bg-gray-100 text-gray-600 rounded-l border hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="w-10 text-center bg-gray-50 border-y">
                      {item.count}
                    </div>
                    <button
                      disabled={isDisabled || item.count >= item.quantity}
                      onClick={() => {
                        if (item.count >= item.quantity) {
                          toast.error(
                            `จำนวนสินค้าทั้งหมดมี ${item.quantity} ชิ้น`
                          );
                          setTimedisable();
                          return;
                        }
                        actionUpdateQuantity(item.id, item.count + 1);
                      }}
                      className="w-8 h-8 bg-gray-100 text-gray-600 rounded-r border hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Stock:{" "}
                    <span className="font-semibold">{item.quantity}</span>
                  </p>
                </div>

                <div className="truncate">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Total:
                  </h3>
                  <p className="text-blue-600 font-bold text-lg">
                    ฿{numberFormat(item.price * item.count)}
                  </p>
                </div>

                <button
                  onClick={() => actionRemoveCartProduct(item.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={30} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <p className="text-3xl font-bold text-gray-800">ยอดรวม</p>
          {totadetail.map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-300 shadow-md rounded-md mb-4 p-4 flex justify-between items-center"
            >
              <div className="text-gray-900 text-[14px] font-semibold ">
                {item.name}
              </div>
              <div className="text-blue-500 text-xl font-bold text-right">
                ฿{numberFormat(item.totalPrice)}
              </div>
            </div>
          ))}

          <div className="flex justify-between text-xl font-bold text-gray-900 mt-4">
            <span>รวมสุทธิ</span>
            <span className="text-2xl text-green-600">
              ฿{numberFormat(getTotaPrice())}
            </span>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {user ? (
              <Link>
                <button
                  disabled={cart.length < 1}
                  onClick={handleSaveCart}
                  className={` w-full rounded-md text-white py-3 shadow-md hover:bg-red-600 transition duration-300
                    ${
                      cart.length < 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }
                    `}
                >
                  {cart.length < 1 ? "กรุณาเพิ่มสินค้า" : "สั่งซื้อ"}
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="bg-blue-500 w-full rounded-md text-white py-3 shadow-md hover:bg-blue-700 transition duration-300">
                  Login
                </button>
              </Link>
            )}

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
