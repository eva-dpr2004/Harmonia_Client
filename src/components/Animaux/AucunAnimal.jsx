import React from 'react';
import './AucunAnimal.css'; 

function AucunAnimal() {
  return (
    <div className="aucun-animal-container">
        <img src={`${process.env.PUBLIC_URL}/assets/img/dog.png`} alt="Pas d'animaux img" />
      <p>Aucun animal pour le moment.</p>
      <button>Ajouter</button>
    </div>
  );
}

export default AucunAnimal;
