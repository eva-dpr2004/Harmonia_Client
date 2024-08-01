import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../../context/AuthContext'; // Importer le contexte d'authentification
import './Tableau.css';

function TableauActivites() {
  const { authState } = useContext(AuthContext); // Utiliser le contexte d'authentification
  const [activities, setActivities] = useState(
    Array.from({ length: 5 }).map(() => ({
      animalId: '',
      date: '',
      debutActivite: '',
      finActivite: '',
      dureeActivite: ''
    }))
  );
  const [animaux, setAnimaux] = useState([]);

  const fetchAnimaux = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setAnimaux(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des animaux:', error);
        });
    }
  }, [authState]);

  useEffect(() => {
    fetchAnimaux();
  }, [fetchAnimaux]);

  const handleChange = (index, field, value) => {
    const newActivities = activities.map((activity, i) =>
      i === index ? { ...activity, [field]: value } : activity
    );
    setActivities(newActivities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/activities/ajoutActivite', activities, { withCredentials: true });
      if (response.status === 201) {
        console.log('Activités ajoutées avec succès');
      } else {
        console.error('Erreur lors de l\'ajout des activités');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout des activités', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Animal</th>
              <th>Date</th>
              <th>Début de l'activité</th>
              <th>Fin de l'activité</th>
              <th>Durée de l'activité (h et min)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={activity.animalId}
                    onChange={(e) => handleChange(index, 'animalId', e.target.value)}
                  >
                    <option value="">Sélectionner un animal</option>
                    {animaux.map(animal => (
                      <option key={animal.Id_Animal} value={animal.Id_Animal}>
                        {animal.Nom}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    value={activity.date}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={activity.debutActivite}
                    onChange={(e) => handleChange(index, 'debutActivite', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={activity.finActivite}
                    onChange={(e) => handleChange(index, 'finActivite', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={activity.dureeActivite}
                    readOnly
                  />
                </td>
                <td>
                  <EditIcon className="actions" />
                  <DeleteIcon className="actions" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Ajouter Activités</button>
      </form>
    </div>
  );
}

export default TableauActivites;
