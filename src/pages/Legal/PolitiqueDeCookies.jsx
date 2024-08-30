import React from 'react'
import Navbar from '../../components/Basics/Navbar'
import TextPolitiqueDeCookies from '../../components/Legal/TextPolitiqueDeCookies'
import Footer from '../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function PolitiqueDeCookies() {
  return (
    <div>
      <Navbar/>
      <TextPolitiqueDeCookies/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default PolitiqueDeCookies