import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Reply } from '@mui/icons-material';
import './ProfilStyle.css';
import { updateUserProfile } from '../../services/Users';  

function ModifierProfilForm() {
  const { authState } = useContext(AuthContext);
  const [formData, setFormData] = useState({ Nom: '', Email: '' });
  const [message, setMessage] = useState('');
  const [updateCounts, setUpdateCounts] = useState({ Nom: 0, Email: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const userId = authState.user.Id_Utilisateur;
    const storedCounts = JSON.parse(localStorage.getItem(`updateCounts_${userId}`));
    if (storedCounts) {
      setUpdateCounts(storedCounts);
    }
  }, [authState.user.Id_Utilisateur]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.Nom && !formData.Email) {
      setMessage('Veuillez remplir au moins un des champs.');
      return;
    }

    if (updateCounts.Nom >= 3 && formData.Nom) {
      setMessage('Vous avez dépassé le nombre de modifications du nom autorisées pour aujourd\'hui.');
      return;
    }
    if (updateCounts.Email >= 3 && formData.Email) {
      setMessage('Vous avez dépassé le nombre de modifications de l\'email autorisées pour aujourd\'hui.');
      return;
    }

    updateUserProfile(authState.user.Id_Utilisateur, formData) 
      .then(response => {
        if (response.data.success) {
          setMessage('Profil mis à jour avec succès');

          const newCounts = { ...updateCounts };
          if (formData.Nom) newCounts.Nom += 1;
          if (formData.Email) newCounts.Email += 1;
          setUpdateCounts(newCounts);

          const userId = authState.user.Id_Utilisateur;
          localStorage.setItem(`updateCounts_${userId}`, JSON.stringify(newCounts));

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
      <img src={`${process.env.PUBLIC_URL}/assets/img/Vecteurs/modification_profil-rbg.png`} alt="Img inscription" className='imgModifierProfil'/>
      <div className="modifier-box">
        <h2 className="profil-title">
          <Reply 
            className='fleche2'
            style={{ color: '#183255', cursor: 'pointer', marginRight: '10px', position: 'absolute' }}
            onClick={() => navigate(-1)}
          />
          Modifier Profil
        </h2>
        <form onSubmit={handleSubmit}>
          <p>Modifiez l'information de votre choix :</p>
          <label>Modifier le Nom:</label>
          <input
            type="text"
            name="Nom"
            placeholder='Nouveau Nom'
            value={formData.Nom}
            onChange={handleChange}
          />
          <label>Modifier l'Email:</label>
          <input
            type="email"
            name="Email"
            placeholder='Votre nouvel email'
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
