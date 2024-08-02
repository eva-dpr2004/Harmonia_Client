import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './Tableau.css';

function AjouterActivites() {
  const { authState } = useContext(AuthContext); 
  const [activity, setActivity] = useState({
    animalId: '',
    date: '',
    debutActivite: '',
    finActivite: '',
    dureeActivite: ''
  });
  const [animaux, setAnimaux] = useState([]);
  const [error, setError] = useState('');

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

  const handleChange = (field, value) => {
    setActivity(prevActivity => ({
      ...prevActivity,
      [field]: value
    }));
  };

  const isFutureDateTime = (date, time) => {
    const now = new Date();
    const selectedDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);

    selectedDate.setHours(hours, minutes, 0, 0);

    return selectedDate > now;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activity.animalId || !activity.date || !activity.debutActivite || !activity.finActivite) {
      setError('Tous les champs doivent être remplis.');
      return;
    }

    if (isFutureDateTime(activity.date, activity.debutActivite) || isFutureDateTime(activity.date, activity.finActivite)) {
      setError('Les dates et heures ne peuvent pas être dans le futur.');
      return;
    }

    const { debutActivite, finActivite, animalId } = activity;
    const debutDate = new Date(`1970-01-01T${debutActivite}Z`);
    let finDate = new Date(`1970-01-01T${finActivite}Z`);
    
    if (finDate < debutDate) {
      finDate.setDate(finDate.getDate() + 1);
    }

    const diffMs = finDate - debutDate;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const dureeActivite = `${diffHrs}h ${diffMins}min`;

    const selectedAnimal = animaux.find(animal => animal.Id_Animal === parseInt(animalId));
    const animalNom = selectedAnimal ? selectedAnimal.Nom : '';

    try {
      const response = await axios.post('http://localhost:3001/activities/ajoutActivite', {
        ...activity,
        dureeActivite,
        animalNom
      }, { withCredentials: true });
      if (response.status === 201) {
        console.log('Activité ajoutée avec succès');
        setActivity({
          animalId: '',
          date: '',
          debutActivite: '',
          finActivite: '',
          dureeActivite: ''
        });
        setError('');
      } else {
        console.error('Erreur lors de l\'ajout de l\'activité');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'activité', error);
    }
  };

  return (
    <div>
      <h2 className='title-activites'>Activités</h2>
      <div className='tableau'>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <table>
            <thead>
              <tr>
                <th>Animal</th>
                <th>Date</th>
                <th>Début de l'activité</th>
                <th>Fin de l'activité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    value={activity.animalId}
                    onChange={(e) => handleChange('animalId', e.target.value)}
                    required
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
                    onChange={(e) => handleChange('date', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={activity.debutActivite}
                    onChange={(e) => handleChange('debutActivite', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={activity.finActivite}
                    onChange={(e) => handleChange('finActivite', e.target.value)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className='AddActivité'>Ajouter Activité</button>
        </form>
      </div>
    </div>
  );
}

export default AjouterActivites;
