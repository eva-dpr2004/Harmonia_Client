import React from 'react'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import BoutonAjouterAnimal from '../../components/Animaux/BoutonAjouterAnimal'
import MesAnimauxList from '../../components/Animaux/MesAnimauxList'

function MesAnimaux() {

  return (
    <div>
      <Navbar/>
      <MesAnimauxList/>
      <BoutonAjouterAnimal/>
      <Footer/>
    </div>
  )
}

export default MesAnimaux