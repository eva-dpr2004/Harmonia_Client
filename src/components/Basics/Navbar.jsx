import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 
import logout from '../../context/useLogout'
import './Navbar.css';

const Navbar = () => {
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

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={`${process.env.PUBLIC_URL}/assets/img/logo4-removebg-preview.png`} alt="Harmonia Logo" />
      </div>
      <div className="navbar-links">
        {authState.isAuthenticated ? (
          <>
            <a href="/profil">Profil</a>
            <a href="/mes-animaux">Mes animaux</a>
            <a href="/calendrier">Calendrier</a>
            <a href="/aides">Aides</a>
            <button className="logout-button" onClick={handleLogoutClick}>Déconnexion</button>
          </>
        ) : (
          <>
            <a href="/inscription">Inscription</a>
            <button className="login-button" onClick={handleLoginClick}>Me connecter</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
