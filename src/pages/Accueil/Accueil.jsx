import React from 'react'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import AccueilMain from '../../components/Accueil/AccueilMain'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function Accueil() {
  return (
    <div className='Accueil'>
      <Navbar/>
      <AccueilMain/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default Accueil