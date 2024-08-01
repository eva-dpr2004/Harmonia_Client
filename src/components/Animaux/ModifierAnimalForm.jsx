import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AnimalContext } from '../../context/AnimalContext';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';

function ModifierAnimalForm() {
  const { selectedAnimal, setSelectedAnimal } = useContext(AnimalContext);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [animal, setAnimal] = useState({
    Nom: '',
    Date_De_Naissance: '',
    Date_Adoption: '',
    Espece: '',
    Race: '',
    Sexe: '',
    Poids: '',
    Habitat: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedAnimal) {
      setAnimal(selectedAnimal);
    } else {
      navigate('/mes-animaux');  // Redirect if no animal is selected
    }
  }, [selectedAnimal, navigate]);

  const validationSchema = Yup.object().shape({
    Nom: Yup.string()
      .required('Nom est requis')
      .max(50, 'Le nom ne peut pas dépasser 50 caractères')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ _-]*$/, 'Le nom ne doit contenir que des lettres, des espaces, des tirets ou des underscores')
      .test('contains-two-letters', 'Le nom doit contenir au moins 2 lettres', value => 
        (value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) || []).length >= 2),
    Date_De_Naissance: Yup.date()
      .required('Date de naissance est requise')
      .nullable()
      .max(new Date(), 'La date de naissance ne peut pas être dans le futur'),
    Date_Adoption: Yup.date()
      .required('Date d\'adoption est requise')
      .nullable()
      .min(
        Yup.ref('Date_De_Naissance'),
        'Date d\'adoption doit être après la date de naissance'
      )
      .max(new Date(), 'La date d\'adoption ne peut pas être dans le futur'),
    Espece: Yup.string()
      .required('Type d\'animal est requis')
      .oneOf([
        'chat', 'chien', 'lapin', 'hamster', 'cochon d\'inde', 'furet', 'chinchilla', 'souris', 'singe', 'hérisson',
        'poissons rouges', 'carpes koï', 'poisson-clown', 'poisson-ange', 'poisson-chat',
        'perroquet', 'canari', 'poule', 'coq', 'canard', 'oie', 'dindon', 'perruche', 'pigeon', 'moineau',
        'tortue', 'lézard', 'gecko', 'serpent', 'axolotl', 'salamandre', 'iguane', 'caméléon', 'grenouille', 'triton'
      ], 'Type d\'animal invalide'),
    Race: Yup.string().required('Race est requise'),
    Sexe: Yup.string().required('Sexe est requis'),
    Poids: Yup.number()
      .required('Poids est requis')
      .min(0.1, 'Le poids doit être au minimum de 0.1 kg')
      .max(4000, 'Le poids ne peut pas dépasser 4000kg'),
    Habitat: Yup.string().required('Habitat est requis')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validationSchema.isValid(animal);
    if (!isValid) {
      alert('Veuillez remplir correctement tous les champs.');
      return;
    }

    const isModified = Object.keys(animal).some(key => animal[key] !== selectedAnimal[key]);
    if (!isModified) {
      alert('Veuillez modifier au moins un champ.');
      return;
    }

    try {
      await axios.put(`http://localhost:3001/animals/updateAnimal/${selectedAnimal.Id_Animal}`, animal, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        },
        withCredentials: true
      });
      setSelectedAnimal(null);
      navigate('/mes-animaux') 
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'animal:', error);
      setMessage('Erreur lors de la mise à jour de l\'animal');
    }
  };

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Modifier Animal: {animal.Nom}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" name="Nom" value={animal.Nom} onChange={handleChange} />
        </div>
        <div>
          <label>Date de Naissance:</label>
          <input type="date" name="Date_De_Naissance" value={animal.Date_De_Naissance} onChange={handleChange} />
        </div>
        <div>
          <label>Date d'Adoption:</label>
          <input type="date" name="Date_Adoption" value={animal.Date_Adoption} onChange={handleChange} />
        </div>
        <div>
          <label>Espèce:</label>
          <input type="text" name="Espece" value={animal.Espece} onChange={handleChange} />
        </div>
        <div>
          <label>Race:</label>
          <input type="text" name="Race" value={animal.Race} onChange={handleChange} />
        </div>
        <div>
          <label>Sexe:</label>
          <input type="text" name="Sexe" value={animal.Sexe} onChange={handleChange} />
        </div>
        <div>
          <label>Poids (kg):</label>
          <input type="number" name="Poids" value={animal.Poids} onChange={handleChange} />
        </div>
        <div>
          <label>Habitat:</label>
          <input type="text" name="Habitat" value={animal.Habitat} onChange={handleChange} />
        </div>
        <button type="submit">Enregistrer les modifications</button>
        {message && <p className="error">{message}</p>}
      </form>
    </div>
  );
}

export default ModifierAnimalForm;
