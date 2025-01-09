import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../componets/MainNav'

const Layout = () => {
  return (
    <div>
      <MainNav/>
      
      <main>

      <Outlet/>
      </main>
    </div>
  )
}

export default Layout
