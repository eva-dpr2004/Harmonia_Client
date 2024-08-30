import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 
import logout from '../../context/useLogout';
import '../../styles/Boutons.css'
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout(setAuthState);
  }; 

  const handleLoginClick = () => {
    navigate('/connexion');
  };

  const handleLogoClick = () => {
    navigate('/'); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={`${process.env.PUBLIC_URL}/assets/img/logo4-removebg-preview.png`} alt="Harmonia Logo" />
      </div>
      <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
        {authState.isAuthenticated ? (
          <>
            <Link to="/profil">Profil</Link>
            <Link to="/mes-animaux">Mes animaux</Link>
            <Link to="/activites">Activités</Link>
            <Link to="/aides">Aides</Link>
            <button className="logout-button" onClick={handleLogoutClick}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/inscription">Inscription</Link>
            <button className="login-button" onClick={handleLoginClick}>Me connecter</button>
          </>
        )}
      </div>
      <div className="burger-menu" onClick={toggleMobileMenu}>
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
