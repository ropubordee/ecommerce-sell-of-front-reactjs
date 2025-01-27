import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import userEcomStore from "../../store/Ecom-store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const GraphDashboardAdmin = () => {
  const products = userEcomStore((state) => state.products);

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalSold = products.reduce((sum, product) => sum + product.sold, 0);

  const totaproductall = totalSold + totalQuantity

  const db = {
    สินค้าทั้งหมด: products.length,
    ยอดขายสินค้า: totalSold,
    สินค้าที่เหลือในสต็อก: totalQuantity,
    จำนวนสินค้าทั้งหมด: totaproductall,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "กราฟ ข้อมูลสินค้า",
      },
    },
  };

  const labelArry = ["ยอดขาย"];

  const data = {
    labels: labelArry,
    datasets: [
      {
        label: "สินค้าทั้งหมด",
        data: [db.สินค้าทั้งหมด],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "ยอดขายสินค้า",
        data: [db.ยอดขายสินค้า],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
      {
        label: "สินค้าที่เหลือในสต็อก",
        data: [db.สินค้าที่เหลือในสต็อก],
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
      {
        label: "จำนวนทั้งหมดของสินค้า",
        data: [db.จำนวนสินค้าทั้งหมด],
        backgroundColor: "rgba(255, 112, 64, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default GraphDashboardAdmin;
