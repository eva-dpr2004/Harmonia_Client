import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Boutons.css';

function BoutonAjouterAnimal() {
  const navigate = useNavigate();

  const redirectToAddAnimal = () => {
    navigate('/mes-animaux/ajouter-animal');
  };

  return (
    <div className="button-ajouter-animal-container">
      <button className="add-animal-button" onClick={redirectToAddAnimal}>
        Ajouter un Animal
      </button>
    </div>
  );
}

export default BoutonAjouterAnimal;
