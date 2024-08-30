import React from 'react'
import Navbar from '../../components/Basics/Navbar'
import TextMentionsLegales from '../../components/Legal/TextMentionsLegales'
import Footer from '../../components/Basics/Footer'
import ContrasteBouton from '../../components/Contraste/ContrasteBouton'

function MentionsLegales() {
  return (
    <div>
      <Navbar/>
      <TextMentionsLegales/>
      <ContrasteBouton/>
      <Footer/>
    </div>
  )
}

export default MentionsLegales