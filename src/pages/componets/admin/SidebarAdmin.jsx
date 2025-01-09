import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { SquareChartGantt } from 'lucide-react';
import { ChartBarStacked } from 'lucide-react';
import { ShoppingBasket } from 'lucide-react';




const SidebarAdmin = () => {
  return (
    <div
      className="w-64 bg-gray-700 text-gray-100 
    flex flex-col h-screen"
    >
      <div
        className="h-24 bg-slate-900 flex items-center justify-center
      text-2xl font-bold"
      >
        Admin Panel
      </div>

      <nav className="flex-1 py-4 px-4 space-y-2">
        <NavLink
        to={'/admin'}
        end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-800 rounded-md text-white px-4 py-2 hover:bg-gray-500 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>
        <NavLink
        to={'manage'}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-800 rounded-md text-white px-4 py-2 hover:bg-gray-500 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <SquareChartGantt className="mr-2" />
          Manage
        </NavLink>


        <NavLink
        to={'category'}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-800 rounded-md text-white px-4 py-2 hover:bg-gray-500 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <ChartBarStacked className="mr-2" />
          Category
        </NavLink>

        <NavLink
        to={'product'}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-800 rounded-md text-white px-4 py-2 hover:bg-gray-500 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <ShoppingBasket className="mr-2" />
          Product
        </NavLink>
       
      </nav>

      <div>
      <NavLink
      
          className={({ isActive }) =>
            isActive
              ? "bg-gray-800 rounded-md text-white px-4 py-2 hover:bg-gray-500 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
