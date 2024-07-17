import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function ModifierProfilForm() {
  const { authState } = useContext(AuthContext);
  const [formData, setFormData] = useState({ Nom: '', Email: '' });
  const [message, setMessage] = useState('');

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
    <div>
      <h1>Modifier Profil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="Nom"
            value={formData.Nom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Mettre à jour</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ModifierProfilForm;
