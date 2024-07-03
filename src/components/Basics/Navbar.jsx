import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/connexion');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={`${process.env.PUBLIC_URL}/assets/img/logo4-removebg-preview.png`} alt="Harmonia Logo" />
      </div>
      <div className="navbar-links">
        <a href="/inscription">Inscription</a>
        <button className="login-button" onClick={handleLoginClick}>Me connecter</button>
      </div>
    </nav>
  );
}

export default Navbar;
