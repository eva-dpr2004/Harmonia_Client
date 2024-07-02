import React from 'react';
import { Routes, Route } from "react-router-dom";

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
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-de-confidentialite" element={<PolitiqueDeConfidentialite />} />
      <Route path="/politique-de-cookies" element={<PolitiqueDeCookies />} />
      <Route path="/calendrier" element={<Calendrier />} />
      <Route path="/mes-animaux" element={<MesAnimaux />} />
      <Route path="/mes-animaux/ajouter-animal" element={<AjouterAnimal />} />
      <Route path="/mes-animaux/ajouter-animal/liste-animaux" element={<TypesAnimaux />} />
      <Route path="/mes-animaux/modifier-animal" element={<ModifierAnimal />} />
      <Route path="/aides" element={<Aides />} />
      <Route path="/aides/avis-global" element={<AvisGlobal />} />
      <Route path="/aides/besoin-d'aide" element={<BesoinAide />} />
      <Route path="/profil:admin" element={<Profil />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/profil/modifier-profil" element={<ModifierProfil />} />
      <Route path="/profil/supprimer-profil" element={<SupprimerProfil />} />
      <Route path="/validation-ajout" element={<ValidationAjout />} />
      <Route path="/envoie-confirmation" element={<EnvoieConfirmation />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
