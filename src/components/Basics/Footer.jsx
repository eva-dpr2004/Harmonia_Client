import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>
        <a href="/politique-de-cookies">Politique de cookies</a>
        <a href="/mentions-legales">Mentions légales</a>
      </div>
      <div className="footer-rights">
        <p>© 2024 Harmonia. Tous Droits Réservés.</p>
        <img src={`${process.env.PUBLIC_URL}/assets/img/cat-removebg-preview.png`} alt="Cat Logo" />
      </div>
    </footer>
  );
}

export default Footer;
