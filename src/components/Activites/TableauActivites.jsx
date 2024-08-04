import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import './Tableau.css';

function TableauActivites() {
  const { authState } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);

  const fetchActivities = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/activities/getActivitesByUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setActivities(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des activités:', error);
        });
    }
  }, [authState]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleDelete = (id) => {
    if (window.confirm('Suppression de l\'activité ? appuyer sur ok pour confirmer')) {
      axios.delete(`http://localhost:3001/activities/deleteActivites/${id}`, { withCredentials: true })
        .then((response) => {
          console.log('Réponse de suppression:', response);
          fetchActivities();
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de l\'activité:', error);
        });
    }
  };

  return (
    <div>
      {activities.length > 0 ? (
        <div>
          <h2 className='title-activites'>Tableau des Activités</h2>
          <div className='tableau'>
            <table>
              <thead>
                <tr>
                  <th>Animal</th>
                  <th>Date</th>
                  <th>Début de l'activité</th>
                  <th>Fin de l'activité</th>
                  <th>Durée de l'activité</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity.Id_Activite}>
                    <td>{activity.Nom_Animal}</td>
                    <td>{activity.Date}</td>
                    <td>{activity.Debut_Activite}</td>
                    <td>{activity.Fin_Activite}</td>
                    <td>{activity.Duree_Activite}</td>
                    <td>
                      <IconButton onClick={() => handleDelete(activity.Id_Activite)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button>Calculer la moyenne de sortie</button>
        </div>
      ) : (
        <p>Aucune activité enregistrée pour vos animaux.</p>
      )}
    </div>
  );
}

export default TableauActivites;
