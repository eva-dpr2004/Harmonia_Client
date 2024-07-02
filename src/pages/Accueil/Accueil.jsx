import React from 'react'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import AccueilMain from '../../components/Accueil/AccueilMain'

function Accueil() {
  return (
    <div className='Accueil'>
      <Navbar/>
      <AccueilMain/>
      <Footer/>
    </div>
  )
}

export default Accueil