import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFoundRedirection() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Oops, cette page n'existe pas</h1>
      <p className="not-found-message">Vous pouvez cliquer sur le bouton pour vous rediriger à la page d'accueil.</p>
      <button className="home-button" onClick={redirectToHome}>Aller à la page d'accueil</button>
    </div>
  );
}

export default NotFoundRedirection;
