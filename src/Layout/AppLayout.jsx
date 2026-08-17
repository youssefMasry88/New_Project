import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'


export default function AppLayout() {
  return (
    <div>
        <NavBar/>
        <Outlet  />
        <Footer />
    </div>
  )
}
