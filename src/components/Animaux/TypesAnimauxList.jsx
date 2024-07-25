import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PetsIcon from '@mui/icons-material/Pets';
import FishIcon from '@mui/icons-material/EmojiNature';  
import BirdIcon from '@mui/icons-material/EmojiNature';  
import ReptileIcon from '@mui/icons-material/EmojiNature';  
import './TypesAnimaux.css';

function TypesAnimauxList() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="types-animaux-container">
        <h2>Les types d'animaux disponibles :</h2>
      <div className="back-button" onClick={goBack}>
        <ArrowBackIcon />
        <p>Retour</p>
      </div>
      <div className="types-animaux-section">
        <h3><PetsIcon /> Mammifères :</h3>
        <ul className="types-animaux-list">
          <li>Chat -</li>
          <li>Chien -</li>
          <li>Lapin -</li>
          <li>Hamster -</li>
          <li>Cochon d'Inde -</li>
          <li>Furet -</li>
          <li>Chinchilla -</li>
          <li>Souris -</li>
          <li>Singe -</li>
          <li>Hérisson</li>
        </ul>
      </div>

      <div className="types-animaux-section">
        <h3><FishIcon /> Poissons :</h3>
        <ul className="types-animaux-list">
          <li>Poissons rouges -</li>
          <li>Carpes koï -</li>
          <li>Poisson-clown -</li>
          <li>Poisson-ange -</li>
          <li>Poisson-chat</li>
        </ul>
      </div>

      <div className="types-animaux-section">
        <h3><BirdIcon /> Oiseaux :</h3>
        <ul className="types-animaux-list">
          <li>Perroquet -</li>
          <li>Canari -</li>
          <li>Poule -</li>
          <li>Coq -</li>
          <li>Canard -</li>
          <li>Oie -</li>
          <li>Dindon -</li>
          <li>Perruche -</li>
          <li>Pigeon -</li>
          <li>Moineau</li>
        </ul>
      </div>

      <div className="types-animaux-section">
        <h3><ReptileIcon /> Reptiles et Amphibiens :</h3>
        <ul className="types-animaux-list">
          <li>Tortue -</li>
          <li>Lézard -</li>
          <li>Gecko -</li>
          <li>Serpent -</li>
          <li>Axolotl -</li>
          <li>Salamandre -</li>
          <li>Iguane -</li>
          <li>Caméléon -</li>
          <li>Grenouille -</li>
          <li>Triton</li>
        </ul>
      </div>
    </div>
  );
}

export default TypesAnimauxList;
