import React from 'react'
import Navbar from '../../components/Basics/Navbar'
import Footer from '../../components/Basics/Footer'
import ChoixFeedback from '../../components/Aides/ChoixFeedback'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function Aides() {
  return (
    <div className='Aides'>
      <Navbar/>
      <ChoixFeedback/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default Aides