import React, { useContext } from 'react';
import './AccueilMain.css';
import '../../styles/Boutons.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 

function AccueilMain() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext); 

  const handleCommencerClick = () => {
    navigate('/inscription'); 
  };

  return (
    <div className='AccueilMain'>
      <img src={`${process.env.PUBLIC_URL}/assets/img/logo4-removebg-preview.png`} alt="Img accueil" className='Harmonia_logo'/>
      <div className="AccueilContainer">
        <div className="TextColumn">
          <h1 className="MainTitle">
            Prenez soin de vos compagnons avec amour et simplicité, suivez leur santé et leur bien-être au bout des doigts !
          </h1>
          <p className="Description">
            Avec notre tableau d'activités, surveillez l'activité physique quotidienne et hebdomadaire de vos animaux !
          </p>
          <p className="Description">
            Surveillez leurs activités physiques dans un tableau répertoriant les sorties et découvrez la moyenne de temps pour chaque semaine !
          </p>
          <button 
            className={`StartButton ${authState.isAuthenticated ? 'hidden' : ''}`} 
            onClick={handleCommencerClick}
          >
            Commencer maintenant
          </button>
        </div>
        <div className="ImagesColumn">
          <div className="ImageContainer1">
            <img src={`${process.env.PUBLIC_URL}/assets/img/Vecteurs/pets_owner_playing.jpg`} alt="Img accueil" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccueilMain;
