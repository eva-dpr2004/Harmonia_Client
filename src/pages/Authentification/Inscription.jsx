import React from 'react'
import InscriptionForm from '../../components/Authentification/InscriptionForm'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function Inscription() {
  return (
    <div>
      <Navbar/>
      <InscriptionForm/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default Inscription