import React from 'react';
import './AccueilMain.css';

function AccueilMain() {
  return (
    <div className="AccueilContainer">
      <main className="MainContent">
        <h1 className="MainTitle">
          Prenez soin de vos compagnons avec amour et simplicité, suivez leur santé et leur bien-être au bout des doigts !
        </h1>
        <div className="ImagesRow">
          <div className="ImageContainer">
            <img src={`${process.env.PUBLIC_URL}/assets/img/1.png`} alt="Img accueil 1" />
          </div>
          <div className="ImageContainer">
            <img src={`${process.env.PUBLIC_URL}/assets/img/2.png`} alt="Img accueil 2" />
          </div>
        </div>
        <p className="Description">
          Avec notre calendrier personnalisés, ajoutez des rappels pour vous et vos animaux à l'aide de notifications !
        </p>
        <div className="ImagesRow">
          <div className="ImageContainer">
            <img src={`${process.env.PUBLIC_URL}/assets/img/3.png`} alt="Img accueil 3" />
          </div>
          <div className="ImageContainer">
            <img src={`${process.env.PUBLIC_URL}/assets/img/4.png`} alt="Img accueil 4" />
          </div>
        </div>
        <p className="Description">
          Surveillez leurs activités physiques dans un tableau répertoriant les sorties et découvrez la moyenne de temps pour chaque semaine !
        </p>
        <button className="StartButton">Commencer maintenant</button>
      </main>
    </div>
  );
}

export default AccueilMain;
