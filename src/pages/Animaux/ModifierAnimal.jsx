import React from 'react'
import ModifierAnimalForm from '../../components/Animaux/ModifierAnimalForm'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function ModifierAnimal() {
  return (
    <div>
      <Navbar/>
      <ModifierAnimalForm/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default ModifierAnimal