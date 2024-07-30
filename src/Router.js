import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import axios from 'axios'; 

import Accueil from './pages/Accueil/Accueil';
import Inscription from './pages/Authentification/Inscription';
import Connexion from './pages/Authentification/Connexion';
import Profil from './pages/Profil/Profil';
import SupprimerProfil from './pages/Profil/SupprimerProfil';
import ModifierProfil from './pages/Profil/ModifierProfil';
import MesAnimaux from './pages/Animaux/MesAnimaux';
import AjouterAnimal from './pages/Animaux/AjouterAnimal';
import TypesAnimaux from './pages/Animaux/TypesAnimaux';
import ModifierAnimal from './pages/Animaux/ModifierAnimal';
import Activites from './pages/Activites/Activites';
import Aides from './pages/Aides/Aides';
import AvisGlobal from './pages/Aides/Feedback/AvisGlobal';
import BesoinAide from './pages/Aides/Feedback/BesoinAide';
import ValidationAjout from './pages/Confirmation/ValidationAjout';
import EnvoieConfirmation from './pages/Confirmation/EnvoieConfirmation';
import MentionsLegales from './pages/Legal/MentionsLegales';
import PolitiqueDeConfidentialite from './pages/Legal/PolitiqueDeConfidentialite';
import PolitiqueDeCookies from './pages/Legal/PolitiqueDeCookies';
import PageNotFound from './pages/Error/PageNotFound';

const Router = () => {
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

  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  const canAddAnimals = authState.isAuthenticated && animalCount < 50;

  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/inscription" element={authState.isAuthenticated ? <Navigate to="/" /> : <Inscription />} />
      <Route path="/connexion" element={authState.isAuthenticated ? <Navigate to="/" /> : <Connexion />} />
      <Route path="/profil" element={authState.isAuthenticated ? <Profil /> : <Navigate to="/connexion" />} />
      <Route path="/profil/modifier-profil" element={authState.isAuthenticated ? <ModifierProfil /> : <Navigate to="/connexion" />} />
      <Route path="/profil/supprimer-profil" element={authState.isAuthenticated ? <SupprimerProfil /> : <Navigate to="/connexion" />} />
      <Route path="/mes-animaux" element={authState.isAuthenticated ? <MesAnimaux /> : <Navigate to="/connexion" />} />
      <Route path="/mes-animaux/ajouter-animal" element={canAddAnimals ? <AjouterAnimal /> : <Navigate to="/mes-animaux" />} />
      <Route path="/mes-animaux/ajouter-animal/liste-animaux" element={canAddAnimals ? <TypesAnimaux /> : <Navigate to="/mes-animaux" />} />
      <Route path="/mes-animaux/modifier-animal" element={authState.isAuthenticated ? <ModifierAnimal /> : <Navigate to="/connexion" />} />
      <Route path="/activites" element={authState.isAuthenticated ? <Activites /> : <Navigate to="/connexion" />} />
      <Route path="/aides" element={authState.isAuthenticated ? <Aides /> : <Navigate to="/connexion" />} />
      <Route path="/aides/avis-global" element={authState.isAuthenticated ? <AvisGlobal /> : <Navigate to="/connexion" />} />
      <Route path="/aides/anomalies" element={authState.isAuthenticated ? <BesoinAide /> : <Navigate to="/connexion" />} />
      <Route path="/validation-ajout" element={authState.isAuthenticated ? <ValidationAjout /> : <Navigate to="/connexion" />} />
      <Route path="/envoie-confirmation" element={authState.isAuthenticated ? <EnvoieConfirmation /> : <Navigate to="/connexion" />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-de-confidentialite" element={<PolitiqueDeConfidentialite />} />
      <Route path="/politique-de-cookies" element={<PolitiqueDeCookies />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
