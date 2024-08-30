import React from 'react'
import AjouterAnimalForm from '../../components/Animaux/AjouterAnimalForm'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function AjouterAnimal() {
  return (
    <div>
      <Navbar/>
      <AjouterAnimalForm/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default AjouterAnimal