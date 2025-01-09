import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../componets/admin/SidebarAdmin";
import HeaderAdmin from "../componets/admin/HeaderAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        <HeaderAdmin />

        <main className="flex-1 p-4 bg-gray-400 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
