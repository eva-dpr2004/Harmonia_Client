import React from 'react'
import ProfilCard from '../../components/Profil/ProfilCard'
import Navbar from '../../components/Basics/Navbar'
import Footer from'../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function Profil() {
  return (
    <div>
      <Navbar/>
      <ProfilCard/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default Profil