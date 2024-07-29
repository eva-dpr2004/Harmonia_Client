import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { storage } from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './MesAnimaux.css';

const typesAnimauxDisponibles = [
  'chat', 'chien', 'lapin', 'hamster', 'cochon d\'inde', 'furet', 'chinchilla', 'souris', 'singe', 'hérisson',
  'poissons rouges', 'carpes koï', 'poisson-clown', 'poisson-ange', 'poisson-chat',
  'perroquet', 'canari', 'poule', 'coq', 'canard', 'oie', 'dindon', 'perruche', 'pigeon', 'moineau',
  'tortue', 'lézard', 'gecko', 'serpent', 'axolotl', 'salamandre', 'iguane', 'caméléon', 'grenouille', 'triton'
];

function AjouterAnimalForm() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState('');

  const today = new Date().toISOString().split('T')[0]; 

  const formik = useFormik({
    initialValues: {
      Nom: '',
      Date_De_Naissance: '',
      Date_Adoption: '',
      Espece: '',
      Race: '',
      Sexe: '',
      Poids: '',
      Habitat: '',
    },
    validationSchema: Yup.object({
      Nom: Yup.string()
        .required('Nom est requis')
        .max(50, 'Le nom ne peut pas dépasser 50 caractères'), // Limite de caractères
      Date_De_Naissance: Yup.date()
        .required('Date de naissance est requise')
        .nullable()
        .max(today, 'La date de naissance ne peut pas être dans le futur'),
      Date_Adoption: Yup.date()
        .required('Date d\'adoption est requise')
        .nullable()
        .min(
          Yup.ref('Date_De_Naissance'),
          'Date d\'adoption doit être après la date de naissance'
        )
        .max(today, 'La date d\'adoption ne peut pas être dans le futur'),
      Espece: Yup.string()
        .required('Type d\'animal est requis')
        .transform(value => value ? value.toLowerCase() : value) 
        .oneOf(typesAnimauxDisponibles, 'Type d\'animal invalide'),
      Race: Yup.string().required('Race est requise'),
      Sexe: Yup.string().required('Sexe est requis'),
      Poids: Yup.number()
        .required('Poids est requis')
        .max(4000, 'Le poids ne peut pas dépasser 4000kg'),
      Habitat: Yup.string().required('Habitat est requis'),
    }),
    onSubmit: async values => {
      values.Espece = values.Espece.toLowerCase();

      if (file) {
        const fileRef = ref(storage, `animals/${file.name}`);
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        values.photoURL = photoURL;
      }

      axios.post("http://localhost:3001/animals/ajoutAnimal", values, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        },
        withCredentials: true
      }).then((response) => {
        console.log('Animal ajouté:', response.data);
        navigate('/validation-ajout');  
      }).catch((error) => {
        console.error("Erreur lors de l'ajout de l'animal:", error);
      });
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setFileError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFileError('Please select a valid image file (jpeg, jpg, png, webp).');
      setFile(null);
      setPreview(null);
    }
  };

  const navigateToList = () => {
    navigate('/mes-animaux/ajouter-animal/liste-animaux');
  };

  return (
    <div>
      <h2 className='Title-Mes-Animaux'>Ajouter Animal</h2>
      <form className="ajouter-animal-form" onSubmit={formik.handleSubmit}>
        <div className="file-upload-container">
          <label>Choisir une photo :</label>
          <div className="upload-button-container">
            <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={handleFileChange}/>
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span" sx={{ color: '#1a3558', fontSize: 50 }} >
                <PhotoCamera fontSize="inherit" />
              </IconButton>
            </label>
          </div>
        </div>
        {fileError && <div className="error">{fileError}</div>}
        {preview && <img src={preview} alt="" className="image-preview centered-image" />}
        <div>
          <label>Nom :</label>
          <input type="text" name="Nom" value={formik.values.Nom} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.Nom && formik.errors.Nom ? (
            <span className="error">{formik.errors.Nom}</span>
          ) : null}
        </div>
        <div>
          <label>Date de naissance :</label>
          <input type="date" name="Date_De_Naissance" value={formik.values.Date_De_Naissance} onChange={formik.handleChange} onBlur={formik.handleBlur} max={today} />
          {formik.touched.Date_De_Naissance && formik.errors.Date_De_Naissance ? (
            <span className="error">{formik.errors.Date_De_Naissance}</span>
          ) : null}
        </div>
        <div>
          <label>Date d'adoption :</label>
          <input type="date" name="Date_Adoption" value={formik.values.Date_Adoption} onChange={formik.handleChange} onBlur={formik.handleBlur} max={today} />
          {formik.touched.Date_Adoption && formik.errors.Date_Adoption ? (
            <span className="error">{formik.errors.Date_Adoption}</span>
          ) : null}
        </div>
        <div>
          <label>Type d'animal :</label>
          <input type="text" name="Espece" value={formik.values.Espece} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.Espece && formik.errors.Espece ? (
            <span className="error">{formik.errors.Espece}</span>
          ) : null}
          <h5 className="link" onClick={navigateToList}>Voir la liste des types d'animaux disponibles</h5>
        </div>
        <div>
          <label>Race :</label>
          <input type="text" name="Race" value={formik.values.Race} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.Race && formik.errors.Race ? (
            <span className="error">{formik.errors.Race}</span>
          ) : null}
        </div>
        <div>
          <label>Sexe :</label>
          <div className="sex-options">
            <label>
              <input type="radio" name="Sexe" value="Mâle" checked={formik.values.Sexe === 'Mâle'} onChange={formik.handleChange} /> Mâle
            </label>
            <label>
              <input type="radio" name="Sexe" value="Femelle" checked={formik.values.Sexe === 'Femelle'} onChange={formik.handleChange} /> Femelle
            </label>
            <label>
              <input type="radio" name="Sexe" value="Inconnu" checked={formik.values.Sexe === 'Inconnu'} onChange={formik.handleChange} /> Inconnu
            </label>
            <label>
              <input type="radio" name="Sexe" value="Hermaphrodite" checked={formik.values.Sexe === 'Hermaphrodite'} onChange={formik.handleChange} /> Hermaphrodite
            </label>
          </div>
          {formik.touched.Sexe && formik.errors.Sexe ? (
            <span className="error">{formik.errors.Sexe}</span>
          ) : null}
        </div>
        <div>
          <label>Poids :</label>
          <input type="number" name="Poids" value={formik.values.Poids} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.Poids && formik.errors.Poids ? (
            <span className="error">{formik.errors.Poids}</span>
          ) : null}
        </div>
        <div>
          <label>Habitat :</label>
          <div className="habitat-options">
            <label>
              <input type="radio" name="Habitat" value="Intérieur" checked={formik.values.Habitat === 'Intérieur'} onChange={formik.handleChange} /> Intérieur
            </label>
            <label>
              <input type="radio" name="Habitat" value="Extérieur" checked={formik.values.Habitat === 'Extérieur'} onChange={formik.handleChange} /> Extérieur
            </label>
          </div>
          {formik.touched.Habitat && formik.errors.Habitat ? (
            <span className="error">{formik.errors.Habitat}</span>
          ) : null}
        </div>
        <button type="submit">Ajouter  +</button>
      </form>
    </div>
  );
}

export default AjouterAnimalForm;
