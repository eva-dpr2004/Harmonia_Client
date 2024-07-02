import React from 'react'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import AucunAnimal from '../../components/Animaux/AucunAnimal'
import AjouterAnimalButton from '../../components/Animaux/AjouterAnimalButton'
import MesAnimauxList from '../../components/Animaux/MesAnimauxList'

function MesAnimaux() {

  return (
    <div>
      MesAnimaux
      <Navbar/>
      <MesAnimauxList/>
      <AucunAnimal/>
      <AjouterAnimalButton/>
      <Footer/>
    </div>
  )
}

export default MesAnimaux