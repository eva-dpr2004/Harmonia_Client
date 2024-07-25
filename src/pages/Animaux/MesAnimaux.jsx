import React from 'react'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import AucunAnimal from '../../components/Animaux/AucunAnimal'
import BoutonAjouterAnimal from '../../components/Animaux/BoutonAjouterAnimal'
import MesAnimauxList from '../../components/Animaux/MesAnimauxList'

function MesAnimaux() {

  return (
    <div>
      <Navbar/>
      <MesAnimauxList/>
      <AucunAnimal/>
      <BoutonAjouterAnimal/>
      <Footer/>
    </div>
  )
}

export default MesAnimaux