import React from 'react'
import TableauActivites from '../../components/Activites/TableauActivites'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import AjouterActivites from '../../components/Activites/AjouterActivites'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function Activites() {
  return (
    <div>
      <Navbar/>
      <AjouterActivites/>
      <TableauActivites/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default Activites
