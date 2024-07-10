import React from 'react'
import ConnexionForm from '../../components/Authentification/ConnexionForm'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'

function Connexion() {
  return (
    <div>
      <Navbar/>
      <ConnexionForm/>
      <Footer/>
    </div>
  )
}

export default Connexion