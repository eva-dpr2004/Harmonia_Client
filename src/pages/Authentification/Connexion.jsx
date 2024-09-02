import React from 'react'
import ConnexionForm from '../../components/Authentification/ConnexionForm'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function Connexion() {
  return (
    <div>
      <Navbar/>
      <ConnexionForm/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default Connexion