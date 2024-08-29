import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Select, MenuItem, TextField, FormControl, InputLabel } from '@mui/material';
import { getAnimauxByUserId, addActivite } from '../../services/Activites';
import './Tableau.css';

function AjouterActivites() {
  const { authState } = useContext(AuthContext);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [activity, setActivity] = useState({
    animalId: '',
    date: getCurrentDate(),
    debutActivite: '',
    finActivite: '',
    dureeActivite: ''
  });
  const [animaux, setAnimaux] = useState([]);
  const [error, setError] = useState('');

  const fetchAnimaux = useCallback(async () => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      try {
        const data = await getAnimauxByUserId(authState.user.Id_Utilisateur);
        setAnimaux(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des animaux:', error);
      }
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
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) {
      setError('La durée de l\'activité doit être d\'au moins 1 minute.');
      return;
    }

    const diffHrs = Math.floor(diffMins / 60);
    const remainingMins = diffMins % 60;
    const dureeActivite = `${diffHrs}h ${remainingMins}min`;

    const selectedAnimal = animaux.find(animal => animal.Id_Animal === parseInt(animalId));
    const animalNom = selectedAnimal ? selectedAnimal.Nom : '';

    try {
      const response = await addActivite({
        ...activity,
        dureeActivite,
        animalNom
      });

      if (response.status === 201) {
        console.log('Activité ajoutée avec succès');
        setActivity({
          animalId: '',
          date: getCurrentDate(),
          debutActivite: '',
          finActivite: '',
          dureeActivite: ''
        });
        setError('');
        window.location.reload(); 
      } else {
        console.error('Erreur lors de l\'ajout de l\'activité');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error);
      } else {
        console.error('Erreur lors de l\'ajout de l\'activité', error);
      }
    }
  };

  return (
    <div>
      <h2 className='title-activites'>Activités</h2>
      <div className='tableau'>
        <form onSubmit={handleSubmit} className='ajout-activite-tableau'>
          {error && <p className="error">{error}</p>}
          <table>
            <thead>
              <tr>
                <th>Animal</th>
                <th>Date de l'activité</th>
                <th>Début de l'activité</th>
                <th>Fin de l'activité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FormControl fullWidth>
                    <InputLabel id="animal-select-label">Sélectionner un animal</InputLabel>
                    <Select
                      labelId="animal-select-label"
                      value={activity.animalId}
                      onChange={(e) => handleChange('animalId', e.target.value)}
                      required
                      label="Sélectionner un animal"
                      sx={{ width: '100%' }}
                    >
                      <MenuItem value="">
                        <em>Aucun</em>
                      </MenuItem>
                      {animaux.map(animal => (
                          <MenuItem key={animal.Id_Animal} value={animal.Id_Animal}>
                            {animal.Nom}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <TextField
                    type="date"
                    value={activity.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: getCurrentDate(),
                    }}
                  />
                </td>
                <td>
                  <TextField
                    type="time"
                    value={activity.debutActivite}
                    onChange={(e) => handleChange('debutActivite', e.target.value)}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </td>
                <td>
                  <TextField
                    type="time"
                    value={activity.finActivite}
                    onChange={(e) => handleChange('finActivite', e.target.value)}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" variant="contained" className='AddActivité'>
            Ajouter l'Activité
          </button>
        </form>
      </div>
    </div>
  );
}

export default AjouterActivites;
