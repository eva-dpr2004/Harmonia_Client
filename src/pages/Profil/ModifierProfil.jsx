import React from 'react'
import ModifierProfilForm from '../../components/Profil/ModifierProfilForm'
import Navbar from '../../components/Basics/Navbar'
import Footer from'../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function ModifierProfil() {
  return (
    <div>
      <Navbar/>
      <ModifierProfilForm/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default ModifierProfil