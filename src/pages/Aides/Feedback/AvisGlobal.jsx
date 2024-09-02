import React from 'react';
import AvisGlobalForm from '../../../components/Aides/Feedback/AvisGlobalForm';
import Navbar from '../../../components/Basics/Navbar'; 
import Footer from '../../../components/Basics/Footer'; 
import ContrasteBouton from '../../../components/Contraste/ContrasteBouton';

function AvisGlobal() {
  return (
    <div>
      <Navbar />
      <AvisGlobalForm />
      <ContrasteBouton/>
      <Footer />
    </div>
  );
}

export default AvisGlobal;
