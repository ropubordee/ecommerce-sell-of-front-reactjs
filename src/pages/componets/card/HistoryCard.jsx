import React, { useEffect, useState } from "react";
import { getOrder } from "../../api/user";
import userEcomStore from "../../store/Ecom-store";
import { dateFormat } from "../../utils/datefrom";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const [orders, setOrders] = useState([]);

  const token = userEcomStore((state) => state.token);

  useEffect(() => {
    hdlgetOrer(token);
  }, []);

  const hdlgetOrer = (token) => {
    getOrder(token)
      .then((res) => {
        console.log(res);
        setOrders(res.data.order);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200";
      case "Processing":
        return "bg-blue-200";
      case "Completed":
        return "bg-green-200";
      case "Cancel":
        return "bg-red-200";
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซี้อ</h1>

      {/* หัว */}
      <div className="space-y-4">
        {/* Card */}

        {orders?.map((item, index) => {
          // console.log(item)
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="text-lg font-semibold text-gray-700">
                    {dateFormat(item.updatedAt)}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    item.orderStatus
                  )}`}
                >
                  {item.orderStatus}
                </div>
              </div>

              {/* Table */}
              <div className="mb-4">
                <table className="w-full border border-gray-300 text-left text-sm">
                  <thead className="bg-gray-200 text-gray-600">
                    <tr>
                      <th className="py-2 px-4">Product</th>
                      <th className="py-2 px-4">Price</th>
                      <th className="py-2 px-4">Quantity</th>
                      <th className="py-2 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products?.map((product, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } border-t`}
                      >
                        <td className="py-2 px-4">{product.product.title}</td>
                        <td className="py-2 px-4">{numberFormat (product.product.price)}</td>
                        <td className="py-2 px-4">{product.count}</td>
                        <td className="py-2 px-4">
                          {numberFormat (product.count * product.product.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="flex justify-end mt-4">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-semibold text-gray-700">
                    {numberFormat (item.cartTotal)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
