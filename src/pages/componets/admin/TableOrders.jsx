import React, { useEffect, useState } from "react";
import userEcomStore from "../../store/Ecom-store";
import { changeOrderStatus, getOrdersAdmin } from "../../api/admin/admin";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import moment from "moment";
import { dateFormat } from "../../utils/datefrom";

const TableOrders = () => {
  const token = userEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        console.log(res);
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    console.log(orderId, orderStatus);
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);
        toast.success("Update Status Success");
        handleGetOrder(token);
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
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
    <div>
      <table className="w-full table-auto text-sm text-gray-700">
        <thead>
          <tr className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <th className="px-4 py-2 text-left">ลำดับ</th>
            <th className="px-4 py-2 text-left">ผู้ใช้งาน</th>
            <th className="px-4 py-2 text-left">วันที่</th>
            <th className="px-4 py-2 text-left">สินค้า</th>
            <th className="px-4 py-2 text-left">รวม</th>
            <th className="px-4 py-2 text-left">สถานะ</th>
            <th className="px-4 py-2 text-left">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item, index) => {
            return (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">
                  <p className="font-semibold">{item.orderedBy.email}</p>
                  <p className="text-sm text-gray-600">{item.orderedBy.address}</p>
                </td>
                <td className="px-4 py-2">{dateFormat(item.createdAt)}</td>
                <td className="px-4 py-2">
                  <ul className="space-y-1">
                    {item.products?.map((product, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{product.product.title}</span>
                        <span className="text-sm text-gray-600">
                          {product.count} x {numberFormat(product.product.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2">{numberFormat(item.cartTotal)}</td>
                <td className="px-4 py-2">
                  <span
                    className={`${getStatusColor(item.orderStatus)} px-3 py-1 rounded-full text-xs`}
                  >
                    {item.orderStatus}
                  </span>
                </td>
                <td className="px-4 py-2 ">
                  <select
                    value={item.orderStatus}
                    onChange={(e) =>
                      handleChangeOrderStatus(token, item.id, e.target.value)
                    }
                    className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 "
                  >
                    <option>Not Process</option>
                    <option>Processing</option>
                    <option>Completed</option>
                    <option>Cancel</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default TableOrders;
