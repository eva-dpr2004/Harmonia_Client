import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);  

  const handleLoginClick = () => {
    navigate('/connexion');
  };

  const handleLogoutClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true });
      if (response.data.success) {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
        window.location.href = '/';
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={`${process.env.PUBLIC_URL}/assets/img/logo4-removebg-preview.png`} alt="Harmonia Logo" />
      </div>
      <div className="navbar-links">
        {authState.isAuthenticated ? (
          <>
            <a href="/profil">Profil</a>
            <a href="/mes-animaux">Mes animaux</a>
            <a href="/calendrier">Calendrier</a>
            <a href="/activites">Activités</a>
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
