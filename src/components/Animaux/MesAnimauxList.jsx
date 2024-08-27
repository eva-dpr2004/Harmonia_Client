import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AnimalContext } from '../../context/AnimalContext';
import AucunAnimal from './AucunAnimal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './MesAnimaux.css';

function MesAnimauxList({ fetchAnimalCount }) {
  const { authState } = useContext(AuthContext);
  const { setSelectedAnimal } = useContext(AnimalContext);
  const navigate = useNavigate();
  const [animaux, setAnimaux] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const defaultImage = `${process.env.PUBLIC_URL}/assets/img/dog.png`;

  const fetchAnimaux = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setAnimaux(response.data);
          if ((page - 1) * itemsPerPage >= response.data.length && page > 1) {
            setPage(prevPage => prevPage - 1);
          }
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des animaux:', error);
        });
    }
  }, [authState, page, itemsPerPage]);

  useEffect(() => {
    fetchAnimaux();
  }, [fetchAnimaux]);

  const handleDeleteClick = (animal) => {
    setAnimalToDelete(animal);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (animalToDelete) {
      try {
        const url = `http://localhost:3001/animals/deleteAnimal/${animalToDelete.Id_Animal}`;
        const response = await axios.delete(url, { withCredentials: true });
        if (response.data.success) {
          setMessage('Animal supprimé avec succès !');
          setTimeout(() => {
            setMessage('');
          }, 5000);
          fetchAnimaux();
          fetchAnimalCount();
        } else {
          setMessage('Erreur lors de la suppression de l\'animal.');
        }
      } catch (error) {
        setMessage('Erreur lors de la suppression de l\'animal.');
        console.error('Erreur:', error);
      }
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setAnimalToDelete(null);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleEditClick = (animal) => {
    setSelectedAnimal(animal);
    navigate('/mes-animaux/modifier-animal');
  };

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

  if (animaux.length === 0) {
    return <AucunAnimal />;
  }

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnimaux = animaux.slice(startIndex, endIndex);

  return (
    <div className="animaux-list-container">
      <h2 className="Title-Mes-Animaux">Mes Animaux</h2>
      {message && <p className="message">{message}</p>}
      <ul>
        {displayedAnimaux.map(animal => (
          <li key={animal.Id_Animal} className="animal-card">
            <img src={animal.photoURL || defaultImage} alt={animal.Nom} className="animal-image" />
            <h4>{animal.Nom}</h4>
            <p>Date de Naissance: {animal.Date_De_Naissance}</p>
            <p>Date d'Adoption: {animal.Date_Adoption}</p>
            <p>Espèce: {animal.Espece}</p>
            <p>Race: {animal.Race}</p>
            <p>Sexe: {animal.Sexe}</p>
            <p>Poids: {animal.Poids} kg</p>
            <EditIcon className="edit-icon" onClick={() => handleEditClick(animal)} />
            <DeleteIcon className="delete-icon" onClick={() => handleDeleteClick(animal)} />
          </li>
        ))}
      </ul>
      <Stack className="pagination-container">
        {animaux.length >= 9 && (
          <Pagination
            count={Math.ceil(animaux.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Stack>
      {showModal && (
        <Modal onClose={closeModal} onConfirm={handleConfirmDelete}/>
      )}
    </div>
  );
}

export default MesAnimauxList;