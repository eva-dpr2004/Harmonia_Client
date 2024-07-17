import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import logout from '../../context/useLogout';
import './SupprimerProfilStyle.css'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function SupprimerProfilForm() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/auth/deleteuser/${authState.user.Id_Utilisateur}`, { withCredentials: true });
      if (response.data.success) {
        setMessage('Compte supprimé avec succès.');
        logout(setAuthState);
      } else {
        setMessage('Erreur lors de la suppression du compte.');
      }
    } catch (error) {
      setMessage('Erreur lors de la suppression du compte.');
      console.error('Erreur:', error);
    }
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const Modal = ({ onClose, onConfirm }) => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Confirmation de Suppression</h2>
            <button onClick={onClose} className="modal-close-btn">x</button>
          </div>
          <div className="modal-warning">
            <WarningAmberIcon sx={{ color: 'red', fontSize: 40,  }} />
            <p>Cette action est irréversible. En supprimant votre compte, vous perdrez définitivement toutes vos données, y compris vos informations personnelles, et tout le contenu associé. Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir continuer ?</p>
          </div>
          <div className="modal-actions">
            <button onClick={onConfirm} className="modal-delete">Supprimer</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Supprimer Profil</h1>
      <button onClick={openModal}>Supprimer mon compte</button>
      {isModalOpen && <Modal onClose={closeModal} onConfirm={handleDelete} />}
      {message && <p>{message}</p>}
    </div>
  );
}

export default SupprimerProfilForm;
