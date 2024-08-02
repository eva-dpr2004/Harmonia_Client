import React from 'react'
import TableauActivites from '../../components/Activites/TableauActivites'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import AjouterActivites from '../../components/Activites/AjouterActivites'

function Activites() {
  return (
    <div>
      <Navbar/>
      <AjouterActivites/>
      <TableauActivites/>
      <Footer/>
    </div>
  )
}

export default Activites
