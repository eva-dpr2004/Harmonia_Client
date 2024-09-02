import React from 'react'
import Navbar from '../../components/Basics/Navbar'
import TextPolitiqueDeConfidentialite from '../../components/Legal/TextPolitiqueDeConfidentialite'
import Footer from '../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function PolitiqueDeConfidentialite() {
  return (
    <div>
      <Navbar/>
      <TextPolitiqueDeConfidentialite/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default PolitiqueDeConfidentialite