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
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border">
              <th>ลำดับ</th>
              <th>ผู้ใช้งาน</th>
              <th>วันที่</th>
              <th>สินค้า</th>
              <th>รวม</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item, index) => {
              console.log(item);
              return (
                <tr key={index} className="border">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>

                  <td>{dateFormat(item.createdAt)}</td>

                  <td className="px-2 py-4">
                    {item.products?.map((product, index) => (
                      <li key={index}>
                        {product.product.title} {"   | "}
                        <span className="text-sm">
                          {product.count} x{" "}
                          {numberFormat(product.product.price)}
                        </span>
                      </li>
                    ))}
                  </td>
                  <td>{numberFormat(item.cartTotal)}</td>

                  <td>
                    <span
                      className={`${getStatusColor(
                        item.orderStatus
                      )} px-2 py-1 rounded-full`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      value={item.orderStatus}
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
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
