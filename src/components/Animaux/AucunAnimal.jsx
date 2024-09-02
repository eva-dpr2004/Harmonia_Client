import React from 'react';
import './MesAnimaux.css';

function AucunAnimal() {
  return (
    <div className="aucun-animal-container">
        <img src={`${process.env.PUBLIC_URL}/assets/img/dog-cat.png`} alt="Pas d'animaux img" />
      <p>Aucun animaux pour le moment.</p>
    </div>
  );
}

export default AucunAnimal;
