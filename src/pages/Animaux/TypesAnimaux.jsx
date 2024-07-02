import React from 'react'
import TypesAnimauxList from '../../components/Animaux/TypesAnimauxList'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'

function TypesAnimaux() {
  return (
    <div>
      TypesAnimaux
      <Navbar/>
      <TypesAnimauxList/>
      <Footer/>
    </div>
  )
}

export default TypesAnimaux