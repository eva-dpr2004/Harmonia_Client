import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Reply } from '@mui/icons-material';
import logout from '../../context/useLogout';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import './ProfilStyle.css';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../services/Users';  

function SupprimerProfilForm() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await deleteUser(authState.user.Id_Utilisateur);  
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
            <WarningAmberIcon sx={{ color: 'red', fontSize: 40 }} />
            <p>Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir continuer ?</p>
          </div>
          <div className="modal-actions">
            <button onClick={onConfirm} className="modal-delete">Supprimer</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="supprimer-container">
      <img src={`${process.env.PUBLIC_URL}/assets/img/Vecteurs/supprimer_profil.png`} alt="Img inscription" className='imgSupprimerProfil'/>
      <div className="supprimer-box">
        <h2 className="profil-title">
          <Reply 
            className='fleche'
            style={{  color: '#183255', cursor: 'pointer', marginRight: '10px', position: 'absolute' }}
            onClick={() => navigate(-1)}
          />
          Supprimer Profil
        </h2>
        <p className='supprimer-para'>Vous souhaitez supprimer votre profil ? En supprimant votre compte, vous perdrez définitivement toutes vos données, et tout le contenu associé.</p>
        <button onClick={openModal} className="supprimer-btn">Supprimer mon compte</button>
        {isModalOpen && <Modal onClose={closeModal} onConfirm={handleDelete} />}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default SupprimerProfilForm;
