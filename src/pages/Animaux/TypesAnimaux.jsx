import React from 'react'
import TypesAnimauxList from '../../components/Animaux/TypesAnimauxList'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function TypesAnimaux() {
  return (
    <div>
      <Navbar/>
      <TypesAnimauxList/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default TypesAnimaux