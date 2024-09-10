import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import DOMPurify from 'dompurify';
import { AnimalContext } from '../../context/AnimalContext';
import { AuthContext } from '../../context/AuthContext';
import { updateAnimal } from '../../services/Animaux';
import '../../styles/Formulaires.css';
import { Reply } from '@mui/icons-material';

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
  const [initialAnimal, setInitialAnimal] = useState(null);

  useEffect(() => {
    if (selectedAnimal) {
      setAnimal(selectedAnimal);
      setInitialAnimal({
        ...selectedAnimal,
        Nom: selectedAnimal.Nom.replace(/\s/g, ''),
        Race: selectedAnimal.Race.replace(/\s/g, ''),
        Espece: selectedAnimal.Espece.replace(/\s/g, ''),
        Sexe: selectedAnimal.Sexe.replace(/\s/g, ''),
        Poids: selectedAnimal.Poids,
        Habitat: selectedAnimal.Habitat.replace(/\s/g, '')
      });
    } else {
      navigate('/mes-animaux');
    }
  }, [selectedAnimal, navigate]);

  const validationSchema = Yup.object().shape({
    Nom: Yup.string()
      .required('Nom est requis')
      .max(100, 'Le nom ne peut pas dépasser 100 caractères')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ_-]*$/, 'Le nom ne doit contenir que des lettres, des tirets ou des underscores')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s_-]*$/, 'Le nom ne doit pas contenir de caractères spéciaux')
      .test('contains-two-letters', 'Le nom doit contenir au moins 2 lettres', value =>
        (value.replace(/\s/g, '').match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) || []).length >= 2)
      .test('no-consecutive-uppercase', 'Le nom ne doit pas contenir deux majuscules consécutives', value =>
        !/(?:[A-Z]{2,})/.test(value))
      .test('no-sql-keywords', 'Le nom ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
    Date_De_Naissance: Yup.date()
      .required('Date de naissance est requise')
      .nullable()
      .max(new Date(), 'La date de naissance ne peut pas être dans le futur'),
    Date_Adoption: Yup.date()
      .required('Date d\'adoption est requise')
      .nullable()
      .min(Yup.ref('Date_De_Naissance'), 'Date d\'adoption doit être après la date de naissance')
      .max(new Date(), 'La date d\'adoption ne peut pas être dans le futur'),
    Espece: Yup.string()
      .required('Type d\'animal est requis')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s_-]*$/, 'Le type d\'animal ne doit pas contenir de caractères spéciaux')
      .test('no-sql-keywords', 'Le type d\'animal ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
    Race: Yup.string()
      .required('Race est requise')
      .max(100, 'La race ne peut pas dépasser 100 caractères')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s_-]*$/, 'La race ne doit pas contenir de caractères spéciaux')
      .test('no-consecutive-uppercase', 'La race ne doit pas contenir deux majuscules consécutives', value =>
        !/(?:[A-Z]{2,})/.test(value))
      .test('no-sql-keywords', 'La race ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
    Sexe: Yup.string()
      .required('Sexe est requis')
      .test('no-sql-keywords', 'Le sexe ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
    Poids: Yup.number()
      .required('Poids est requis')
      .min(0.1, 'Le poids doit être au minimum de 0.1 kg')
      .max(4000, 'Le poids ne peut pas dépasser 4000kg'),
    Habitat: Yup.string()
      .required('Habitat est requis')
      .test('no-sql-keywords', 'L\'habitat ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
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

    const isModified = Object.keys(animal).some(key => {
      const newValue = typeof animal[key] === 'string' ? animal[key].replace(/\s/g, '') : animal[key];
      const oldValue = typeof initialAnimal[key] === 'string' ? initialAnimal[key] : selectedAnimal[key];

      if (newValue === '' && oldValue !== '') {
        alert(`Le champ ${key} ne peut pas être vidé.`);
        return false;
      }

      return newValue !== oldValue;
    });

    if (!isModified) {
      alert('Aucune modification détectée ou les espaces ne sont pas pris en compte.');
      return;
    }

    const sanitizedAnimal = {
      ...animal,
      Nom: DOMPurify.sanitize(animal.Nom),
      Race: DOMPurify.sanitize(animal.Race),
      Espece: DOMPurify.sanitize(animal.Espece),
      Sexe: DOMPurify.sanitize(animal.Sexe),
      Habitat: DOMPurify.sanitize(animal.Habitat),
    };

    try {
      const response = await updateAnimal(selectedAnimal.Id_Animal, sanitizedAnimal, authState.token);

      if (response.success) {
        setSelectedAnimal(null);
        navigate('/mes-animaux');
      } else if (response.error) {
        setMessage(response.error);
      }
    } catch (error) {
      setMessage('Vous avez dépassé la limite de 3 modifications de l\'animal par jour');
    }
  };

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modification-animal">
      <h2>
        <Reply 
          style={{ color: '#183255', cursor: 'pointer', marginRight: '10px' }} 
          onClick={() => navigate(-1)} 
        />
        Modifier Animal: {initialAnimal?.Nom}
      </h2>
      <div className="form-container">
        <div className="form-box">
          {message && <p className="error">{message}</p>} 
          <form onSubmit={handleSubmit}>
            <label className="label" htmlFor="Nom">Nom:</label>
            <input id="Nom" type="text" name="Nom" value={animal.Nom} onChange={handleChange} />
            
            <label className="label" htmlFor="Date_De_Naissance">Date de Naissance:</label>
            <input id="Date_De_Naissance" type="date" name="Date_De_Naissance" value={animal.Date_De_Naissance} onChange={handleChange} />
            
            <label className="label" htmlFor="Date_Adoption">Date d'Adoption:</label>
            <input id="Date_Adoption" type="date" name="Date_Adoption" value={animal.Date_Adoption} onChange={handleChange} />
            
            <label className="label" htmlFor="Espece">Espèce:</label>
            <input id="Espece" type="text" name="Espece" value={animal.Espece} onChange={handleChange} />
            
            <label className="label" htmlFor="Race">Race:</label>
            <input id="Race" type="text" name="Race" value={animal.Race} onChange={handleChange} />
            
            <label className="label" htmlFor="Sexe">Sexe:</label>
            <input id="Sexe" type="text" name="Sexe" value={animal.Sexe} onChange={handleChange} />
            
            <label className="label" htmlFor="Poids">Poids (kg):</label>
            <input id="Poids" type="number" name="Poids" value={animal.Poids} onChange={handleChange} />
            
            <label className="label" htmlFor="Habitat">Habitat:</label>
            <input id="Habitat" type="text" name="Habitat" value={animal.Habitat} onChange={handleChange} />
            
            <button type="submit" className="button">Enregistrer les modifications</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifierAnimalForm;