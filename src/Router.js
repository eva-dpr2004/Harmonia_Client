import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';

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
import Calendrier from './pages/Calendrier/Calendrier';
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

  if (authState.isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-de-confidentialite" element={<PolitiqueDeConfidentialite />} />
      <Route path="/politique-de-cookies" element={<PolitiqueDeCookies />} />

      {/* Redirection si connecté */}
      <Route path="/inscription" element={authState.isAuthenticated ? <Navigate replace to="/" /> : <Inscription />} />
      <Route path="/connexion" element={authState.isAuthenticated ? <Navigate replace to="/" /> : <Connexion />} />

      {/* Pages nécessitant une connexion */}
      <Route path="/calendrier" element={authState.isAuthenticated ? <Calendrier /> : <Navigate replace to="/connexion" />} />
      <Route path="/mes-animaux" element={authState.isAuthenticated ? <MesAnimaux /> : <Navigate replace to="/connexion" />} />
      <Route path="/mes-animaux/ajouter-animal" element={authState.isAuthenticated ? <AjouterAnimal /> : <Navigate replace to="/connexion" />} />
      <Route path="/mes-animaux/ajouter-animal/liste-animaux" element={authState.isAuthenticated ? <TypesAnimaux /> : <Navigate replace to="/connexion" />} />
      <Route path="/mes-animaux/modifier-animal" element={authState.isAuthenticated ? <ModifierAnimal /> : <Navigate replace to="/connexion" />} />
      <Route path="/aides" element={authState.isAuthenticated ? <Aides /> : <Navigate replace to="/connexion" />} />
      <Route path="/aides/avis-global" element={authState.isAuthenticated ? <AvisGlobal /> : <Navigate replace to="/connexion" />} />
      <Route path="/aides/besoin-d'aide" element={authState.isAuthenticated ? <BesoinAide /> : <Navigate replace to="/connexion" />} />
      <Route path="/profil:admin" element={authState.isAuthenticated ? <Profil /> : <Navigate replace to="/connexion" />} />
      <Route path="/profil/:id" element={authState.isAuthenticated ? <Profil /> : <Navigate replace to="/connexion" />} />
      <Route path="/profil/:id/modifier-profil" element={authState.isAuthenticated ? <ModifierProfil /> : <Navigate replace to="/connexion" />} />
      <Route path="/profil/:id/supprimer-profil" element={authState.isAuthenticated ? <SupprimerProfil /> : <Navigate replace to="/connexion" />} />
      <Route path="/validation-ajout" element={authState.isAuthenticated ? <ValidationAjout /> : <Navigate replace to="/connexion" />} />
      <Route path="/envoie-confirmation" element={authState.isAuthenticated ? <EnvoieConfirmation /> : <Navigate replace to="/connexion" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
