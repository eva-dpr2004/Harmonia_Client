import React from 'react'
import SupprimerProfilForm from '../../components/Profil/SupprimerProfilForm'
import Navbar from '../../components/Basics/Navbar'
import Footer from'../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function SupprimerProfil() {
  return (
    <div>
      <Navbar/>
      <SupprimerProfilForm/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default SupprimerProfil