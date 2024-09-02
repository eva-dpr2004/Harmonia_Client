import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>
        <a href="/politique-de-cookies">Politique de cookies</a>
        <a href="/conditions-utilisations">Conditions d'utilisations</a>
        <a href="/mentions-legales">Mentions légales</a>
      </div>
      <div className="footer-rights">
        <p>2024 Harmonia. Tous Droits Réservés.</p>
        <img 
          src={`${process.env.PUBLIC_URL}/assets/img/cat-removebg-preview.png`} 
          alt="Harmonia Logo" 
          onClick={handleLogoClick} 
          style={{ cursor: 'pointer' }}
        />
      </div>
    </footer>
  );
}

export default Footer;
