import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Pie} from "react-chartjs-2";
import userEcomStore from "../../store/Ecom-store";
import { getListAllUsers } from "../../api/admin/admin";
import GraphDashboardAdmin from "./GraphDashboardAdmin";

const DashboardCard = () => {


  const token = userEcomStore((state) => state.token);

  const [user, setUser] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterRolelUser = user.filter((user) => user.role === "user");

  const filterRoleAdmin = user.filter((user) => user.role === "admin");

  const filterstatus = user.filter((user) => user.enabled === false);

  const totalUser = filterRolelUser.length;
  const totalAdmin = filterRoleAdmin.length;
  const totalUserEnabled = filterstatus.length;

 

  const db = {
    ผู้ใช้งานที่ถูกระงับ: totalUserEnabled,
    ผู้ดูแลระบบ: totalAdmin,
    ผู้ใช้งานทั่วไป: totalUser,
  };

  const labelArry = Object.keys(db);
  const datalArry = Object.values(db);
  console.log(datalArry);



  
  const data = {
    labels: labelArry,
    datasets: [
      {
        label: "# of Votes",
        data: datalArry,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div >
     <div className="flex flex-col space-y-8 p-6">

  <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Pie Chart</h3>
    <Pie data={data} />
  </div>

  <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Graph</h3>
    <GraphDashboardAdmin />
  </div>
</div>
    </div>
  );
};

export default DashboardCard;
