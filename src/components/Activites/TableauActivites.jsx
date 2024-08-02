import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
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

  return (
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
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity.id}>
                <td>{activity.Nom_Animal}</td>
                <td>{activity.Date}</td>
                <td>{activity.Debut_Activite}</td>
                <td>{activity.Fin_Activite}</td>
                <td>{activity.Duree_Activite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableauActivites;
