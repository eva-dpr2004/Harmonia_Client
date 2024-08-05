import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Select, MenuItem, FormControl, InputLabel, Card, CardContent, Typography } from '@mui/material';
import './Tableau.css';

function TableauActivites() {
  const { authState } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [showWeeklyCard, setShowWeeklyCard] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [totalWeeklyTime, setTotalWeeklyTime] = useState(0);

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

  const handleAnimalChange = (event) => {
    setSelectedAnimal(event.target.value);
    setShowCard(false);
    setShowWeeklyCard(false);
  };

  const animalsWithActivities = [...new Set(activities.map(activity => activity.Nom_Animal))];

  const filteredActivities = selectedAnimal
    ? activities.filter(activity => activity.Nom_Animal === selectedAnimal)
    : [];

  const today = new Date().toISOString().split('T')[0];
  const todaysActivities = filteredActivities.filter(activity => activity.Date === today);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const lastWeekActivities = filteredActivities.filter(activity => new Date(activity.Date) > weekAgo);

  const hasEnoughActivities = todaysActivities.length >= 2;

  const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const calculateTotalTime = () => {
    const totalMinutes = todaysActivities.reduce((total, activity) => {
      const match = activity.Duree_Activite.match(/(\d+)h\s(\d+)min/);
      const hours = match ? parseInt(match[1], 10) : 0;
      const minutes = match ? parseInt(match[2], 10) : 0;
      return total + (hours * 60) + minutes;
    }, 0);
    setTotalTime(totalMinutes);
    setShowCard(true);
  };

  const calculateTotalWeeklyTime = () => {
    const totalMinutes = lastWeekActivities.reduce((total, activity) => {
      const match = activity.Duree_Activite.match(/(\d+)h\s(\d+)min/);
      const hours = match ? parseInt(match[1], 10) : 0;
      const minutes = match ? parseInt(match[2], 10) : 0;
      return total + (hours * 60) + minutes;
    }, 0);
    setTotalWeeklyTime(totalMinutes);
    setShowWeeklyCard(true);
  };

  const checkWeeklyActivities = () => {
    const daysWithActivities = new Set(lastWeekActivities.map(activity => activity.Date));
    return daysWithActivities.size >= 7;
  };

  return (
    <div>
      {activities.length > 0 ? (
        <div>
          <h2 className='title-activites'>Tableau des Activités</h2>
          <FormControl sx={{ width: '18%', marginBottom: '20px' }}>
            <InputLabel id="animal-select-label">Sélectionner un animal</InputLabel>
            <Select
              labelId="animal-select-label"
              value={selectedAnimal}
              onChange={handleAnimalChange}
              required
              label="Sélectionner un animal"
              sx={{ fontSize: '14px'}}
            >
              <MenuItem value="">
                <em>Aucun</em>
              </MenuItem >
              {animalsWithActivities.map((animal, index) => (
                <MenuItem key={index} value={animal} sx={{ fontSize: '14px'}}>
                  {animal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className='tableauActivites'>
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
                {filteredActivities.length > 0 ? (
                  filteredActivities.map(activity => (
                    <tr key={activity.Id_Activite}>
                      <td>{activity.Nom_Animal}</td>
                      <td>{activity.Date}</td>
                      <td>{activity.Debut_Activite}</td>
                      <td>{activity.Fin_Activite}</td>
                      <td>{activity.Duree_Activite}</td>
                      <td>
                        <IconButton onClick={() => handleDelete(activity.Id_Activite)} aria-label="delete">
                          <DeleteIcon sx={{ color: '#193356'}} />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Sélectionnez un animal pour voir ses activités.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='BoutonsMoyenne'>
            {hasEnoughActivities && (
              <button variant="contained" className='AddActivité' onClick={calculateTotalTime}>
                Calculer la durée totale quotidienne
              </button>
            )}
            {checkWeeklyActivities() && (
              <button variant="contained" className='AddActivité' onClick={calculateTotalWeeklyTime}>
                Calculer la durée totale hebdomadaire
              </button>
            )}
          </div>
          {showCard && (
            <Card className="animated-card">
              <CardContent>
                <Typography variant="h5" component="div" color="#183159">
                  Total de temps d'activité pour aujourd'hui
                </Typography>
                <Typography variant="body2" color="#183159">
                  {convertMinutesToHoursAndMinutes(totalTime)} aujourd'hui
                </Typography>
              </CardContent>
            </Card>
          )}
          {showWeeklyCard && (
            <Card className="animated-card">
              <CardContent>
                <Typography variant="h5" component="div" color="#183159">
                  Total de temps d'activité pour la semaine
                </Typography>
                <Typography variant="body2" color="#183159">
                  {convertMinutesToHoursAndMinutes(totalWeeklyTime)} cette semaine
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <p>Aucune activité enregistrée pour vos animaux.</p>
      )}
    </div>
  );
}

export default TableauActivites;
