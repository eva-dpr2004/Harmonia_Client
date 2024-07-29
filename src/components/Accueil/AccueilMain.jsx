import React, { useContext } from 'react';
import './AccueilMain.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 

function AccueilMain() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext); 

  const handleCommencerClick = () => {
    navigate('/inscription'); 
  };

  return (
    <div className="AccueilContainer">
      <main className="MainContent">
        <h1 className="MainTitle">
          Prenez soin de vos compagnons avec amour et simplicité, suivez leur santé et leur bien-être au bout des doigts !
        </h1>
        <div className="ImagesRow">
          <div className="ImageContainer1">
            <img src={`${process.env.PUBLIC_URL}/assets/img/1.png`} alt="Img accueil 1" />
          </div>
          <div className="ImageContainer2">
            <img src={`${process.env.PUBLIC_URL}/assets/img/2.png`} alt="Img accueil 2" />
          </div>
        </div>
        <p className="Description">
          Avec notre tableau d'activités, surveillez l'activité physique quotidienne et hebdomadaire de vos animaux !
        </p>
        <div className="ImagesRow">
          <div className="ImageContainer3">
            <img src={`${process.env.PUBLIC_URL}/assets/img/3.png`} alt="Img accueil 3" />
          </div>
          <div className="ImageContainer4">
            <img src={`${process.env.PUBLIC_URL}/assets/img/4.png`} alt="Img accueil 4" />
          </div>
        </div>
        <p className="Description2">
          Surveillez leurs activités physiques dans un tableau répertoriant les sorties et découvrez la moyenne de temps pour chaque semaine !
        </p>
        <button 
          className={`StartButton ${authState.isAuthenticated ? 'hidden' : ''}`} 
          onClick={handleCommencerClick} 
          style={{ cursor: 'pointer' }}
        >
          Commencer maintenant
        </button>
      </main>
    </div>
  );
}

export default AccueilMain;
