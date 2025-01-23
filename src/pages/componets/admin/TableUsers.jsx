import React, { useEffect, useState } from "react";
import userEcomStore from "../../store/Ecom-store";
import { changeUserRole, changeUserStatus, getListAllUsers } from "../../api/admin/admin";
import { dateFormat } from "../../utils/datefrom";
import {toast} from 'react-toastify'

const TableUsers = () => {
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
  const handleChangeUserStatus = (userId,userStatus)=>{
    console.log(userId,userStatus)
    const value ={
        id : userId,
        enabled : !userStatus
    }
     changeUserStatus(token,value)
     .then((res)=>{
        console.log(res)
        handleGetUsers(token)
        toast.success('Update Status Success')
     })
     .catch(err => console.log(err))
  }
  const handleChangeUserRole = (userId,userRole)=>{
  
    const value ={
        id : userId,
        role : userRole
    }
     changeUserRole(token,value)
     .then((res)=>{
        console.log(res)
        handleGetUsers(token)
        toast.success('Update Role Success')
     })
     .catch(err => console.log(err))
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
    <table className="min-w-full table-auto bg-white border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-700 text-sm">
          <th className="px-4 py-2 border-b">ลำดับ</th>
          <th className="px-4 py-2 border-b">Email</th>
          <th className="px-4 py-2 border-b">วันที่สมัคร</th>
          <th className="px-4 py-2 border-b">วันที่แก้ไขล่าสุด</th>
          <th className="px-4 py-2 border-b">สิทธิ์</th>
          <th className="px-4 py-2 border-b">สถานะ</th>
          <th className="px-4 py-2 border-b">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {user?.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b text-center">{index + 1}</td>
            <td className="px-4 py-2 border-b">{item.email}</td>
            <td className="px-4 py-2 border-b">{dateFormat(item.createdAt)}</td>
            <td className="px-4 py-2 border-b">{dateFormat(item.updatedAt)}</td>
  
            <td className="px-4 py-2 border-b">
              <select
                onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                value={item.role}
                className="p-1 border rounded-md text-gray-700"
              >
                <option>user</option>
                <option>admin</option>
              </select>
            </td>
  
            <td className="px-4 py-2 border-b text-center">
              {item.enabled ? (
                <span className="text-green-500">Active</span>
              ) : (
                <span className="text-red-500">Inactive</span>
              )}
            </td>
            <td className="px-4 py-2 border-b text-center">
              <button
                className={`p-2 rounded-md shadow-md text-white ${
                  item.enabled ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                onClick={() => handleChangeUserStatus(item.id, item.enabled)}
              >
                {item.enabled ? 'Disable' : 'Enable'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default TableUsers;
