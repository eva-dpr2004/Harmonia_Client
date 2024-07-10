import React from 'react'
import ProfilCard from '../../components/Profil/ProfilCard'
import AdminDashboard from '../../components/Admin/AdminDashboard'
import Navbar from '../../components/Basics/Navbar'
import Footer from'../../components/Basics/Footer'

function Profil() {
  return (
    <div>
      <Navbar/>
      <ProfilCard/>
      <AdminDashboard/>
      <Footer/>
    </div>
  )
}

export default Profil