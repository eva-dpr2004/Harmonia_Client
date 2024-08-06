import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './ProfilStyle.css';

function ModifierProfilForm() {
  const { authState } = useContext(AuthContext);
  const [formData, setFormData] = useState({ Nom: '', Email: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      setFormData({ Nom: authState.user.Nom, Email: authState.user.Email });
    }
  }, [authState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/auth/updateuser/${authState.user.Id_Utilisateur}`;
    axios.put(url, formData, { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setMessage('Profil mis à jour avec succès');
          navigate('/profil'); 
        } else {
          setMessage('Erreur lors de la mise à jour du profil');
        }
      })
      .catch(error => {
        setMessage('Erreur lors de la mise à jour du profil');
        console.error('Erreur:', error);
      });
  };

  return (
    <div className="modifier-container">
      <img src={`${process.env.PUBLIC_URL}/assets/img/Vecteurs/modification_profil.png`} alt="Img inscription" className='imgModifierProfil'/>
      <div className="modifier-box">
        <h2 className="profil-title">Modifier Profil</h2>
        <form onSubmit={handleSubmit}>
          <p>Modifiez l'information de votre choix :</p>
          <label>Nom:</label>
          <input
            type="text"
            name="Nom"
            placeholder='Votre nom'
            value={formData.Nom}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            placeholder='Votre email'
            value={formData.Email}
            onChange={handleChange}
          />
          <button type="submit">Mettre à jour</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default ModifierProfilForm;
