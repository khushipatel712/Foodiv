import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <div>
   <Navbar/>
   <div className='content'>
    <Outlet/>
   </div>

    </div>
  )
}
