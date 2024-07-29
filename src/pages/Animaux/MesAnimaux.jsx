import React, { useState, useEffect, useContext, useCallback } from 'react';
import Navbar from '../../components/Basics/Navbar';
import Footer from '../../components/Basics/Footer';
import BoutonAjouterAnimal from '../../components/Animaux/BoutonAjouterAnimal';
import MesAnimauxList from '../../components/Animaux/MesAnimauxList';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function MesAnimaux() {
  const { authState } = useContext(AuthContext);
  const [animalCount, setAnimalCount] = useState(0);

  const fetchAnimalCount = useCallback(async () => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      try {
        const response = await axios.get(`http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`);
        setAnimalCount(response.data.length);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    }
  }, [authState.isAuthenticated, authState.user?.Id_Utilisateur]);

  useEffect(() => {
    fetchAnimalCount();
  }, [fetchAnimalCount]);

  return (
    <div>
      <Navbar />
      <MesAnimauxList fetchAnimalCount={fetchAnimalCount} />
      {animalCount < 50 ? (
        <BoutonAjouterAnimal />
      ) : (
        <div className="limit-message">Vous avez atteint la limite d'animal</div>
      )}
      <Footer />
    </div>
  );
}

export default MesAnimaux;
