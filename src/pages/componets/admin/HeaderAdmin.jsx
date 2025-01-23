import React from 'react'

const HeaderAdmin = () => {
  return (
<header className="bg-gradient-to-r from-red-200 to-yellow-100 h-16 flex items-center justify-between px-6 shadow-md">    {/* โลโก้ หรือ ชื่อแอป */}
    <div className="text-xl font-semibold text-gray-800">Dashboard</div>
  
    {/* เมนูการตั้งค่าและผู้ใช้ */}
    <div className="flex items-center space-x-3">
      {/* การแจ้งเตือน */}
      
      <div>
        <img  className='w-12 object-cover ' src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-teacher-avatars-flat-icons-pack-people-456321.png?f=webp&w=256" alt="" />
      </div>
      <div className="text-gray-800 font-bold text-xl">Admin</div>
  
    
    
    </div>
  </header>
  )
}

export default HeaderAdmin
