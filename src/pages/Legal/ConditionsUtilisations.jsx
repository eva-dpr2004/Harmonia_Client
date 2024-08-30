import React from 'react'
import TextConditionsUtilisations from '../../components/Legal/TextConditionsUtilisations'
import Footer from '../../components/Basics/Footer'
import Navbar from '../../components/Basics/Navbar'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function ConditionsUtilisations() {
  return (
    <div>
      <Navbar/>
      <TextConditionsUtilisations/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default ConditionsUtilisations
