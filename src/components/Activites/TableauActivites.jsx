import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Select, MenuItem, FormControl, InputLabel, Card, CardContent, Typography, Pagination, Stack } from '@mui/material';
import { getActivitesByUserId, deleteActivite } from '../../services/Activites';
import './Tableau.css';

function TableauActivites() {
  const { authState } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [showWeeklyCard, setShowWeeklyCard] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [totalWeeklyTime, setTotalWeeklyTime] = useState(0);
  const [hasWeeklyActivitiesForEachDay, setHasWeeklyActivitiesForEachDay] = useState(false);

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10); 

  const fetchActivities = useCallback(async () => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      try {
        const data = await getActivitesByUserId(authState.user.Id_Utilisateur);
        setActivities(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des activités:', error);
      }
    }
  }, [authState]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleDelete = async (id) => {
    if (window.confirm('Suppression de l\'activité ? appuyer sur ok pour confirmer')) {
      try {
        const response = await deleteActivite(id);
        console.log('Réponse de suppression:', response);
        fetchActivities();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'activité:', error);
      }
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

  const sortedActivities = filteredActivities.sort((a, b) => new Date(b.Date) - new Date(a.Date));

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedActivities = sortedActivities.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const today = new Date().toISOString().split('T')[0];
  const todaysActivities = sortedActivities.filter(activity => activity.Date === today);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const lastWeekActivities = sortedActivities.filter(activity => new Date(activity.Date) >= weekAgo);

  const hasEnoughActivities = todaysActivities.length >= 2;

  const checkWeeklyActivitiesForEachDay = useCallback(() => {
    const daysWithActivities = new Set(lastWeekActivities.map(activity => activity.Date));
    
    const past7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });

    const allDaysCovered = past7Days.every(day => daysWithActivities.has(day));
    
    setHasWeeklyActivitiesForEachDay(allDaysCovered);
  }, [lastWeekActivities]);

  useEffect(() => {
    if (lastWeekActivities.length > 0) {
      checkWeeklyActivitiesForEachDay();
    }
  }, [lastWeekActivities, checkWeeklyActivitiesForEachDay]);

  const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const calculateTotalTime = () => {
    const timeRegex = /^(\d{1,2})h\s(\d{1,2})min$/; // Expression régulière simplifiée pour éviter le backtracking excessif
    const totalMinutes = todaysActivities.reduce((total, activity) => {
      const match = activity.Duree_Activite.match(timeRegex); // Utilisation de la regex simplifiée
      const hours = match ? parseInt(match[1], 10) : 0;
      const minutes = match ? parseInt(match[2], 10) : 0;
      return total + (hours * 60) + minutes;
    }, 0);
    setTotalTime(totalMinutes);
    setShowCard(true);
  };

  const calculateTotalWeeklyTime = () => {
    const timeRegex = /^(\d{1,2})h\s(\d{1,2})min$/; // Même expression régulière pour la semaine
    const totalMinutes = lastWeekActivities.reduce((total, activity) => {
      const match = activity.Duree_Activite.match(timeRegex);
      const hours = match ? parseInt(match[1], 10) : 0;
      const minutes = match ? parseInt(match[2], 10) : 0;
      return total + (hours * 60) + minutes;
    }, 0);
    setTotalWeeklyTime(totalMinutes);
    setShowWeeklyCard(true);
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
                {displayedActivities.length > 0 ? (
                  displayedActivities.map(activity => (
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
          <Stack >
            {sortedActivities.length > itemsPerPage && (
              <Pagination
              className='pagination-container'
                count={Math.ceil(sortedActivities.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Stack>
          <div className='BoutonsMoyenne'>
            {hasEnoughActivities && (
              <button variant="contained" className='AddActivité' onClick={calculateTotalTime}>
                Calculer la durée totale quotidienne
              </button>
            )}
            {hasWeeklyActivitiesForEachDay && (
              <button variant="contained" className='AddActivité' onClick={calculateTotalWeeklyTime}>
                Calculer la durée totale des 7 derniers jours
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
                  Total de temps d'activité pour les 7 derniers jours
                </Typography>
                <Typography variant="body2" color="#183159">
                  {convertMinutesToHoursAndMinutes(totalWeeklyTime)} cette semaine
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <p className='para-bleu'>Aucune activité enregistrée pour vos animaux.</p>
      )}
    </div>
  );
}

export default TableauActivites;
