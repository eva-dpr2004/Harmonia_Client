import React from 'react'
import AjouterAnimalForm from '../../components/Animaux/AjouterAnimalForm'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'

function AjouterAnimal() {
  return (
    <div>
      <Navbar/>
      <AjouterAnimalForm/>
      <Footer/>
    </div>
  )
}

export default AjouterAnimal