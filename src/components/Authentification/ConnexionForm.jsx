import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import '../../styles/Formulaires.css';

function ConnexionForm() {
  const [NomOrEmail, setNomOrEmail] = useState("");
  const [Mot_De_Passe, setMot_De_Passe] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    NomOrEmail: Yup.string()
      .required("Le nom ou l'email est requis")
      .test(
        'is-valid',
        "Le nom ou l'email doit être valide",
        value => value && (Yup.string().email().isValidSync(value) || /^[\p{L}0-9-_' ]{3,15}$/u.test(value))
      ),
    Mot_De_Passe: Yup.string()
      .min(12, "Le mot de passe doit contenir au moins 12 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{12,}$/,
        "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
      )
      .required("Le mot de passe est requis"),
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", { withCredentials: true })
      .then((response) => {
        if (!response.data.error) {
          navigate('/');
        }
      });
  }, [navigate]);

  const login = async () => {
    try {
      await validationSchema.validate({ NomOrEmail, Mot_De_Passe });

      const data = { NomOrEmail, Mot_De_Passe };
      axios.post("http://localhost:3001/auth/login", data, { withCredentials: true })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            window.location = '/profil';
          }
        })
        .catch((error) => {
          alert("Erreur de connexion: " + error.message);
        });
    } catch (validationError) {
      alert(validationError.message);
    }
  };

  return (
    <div className='connexion-container'>
      <img src={`${process.env.PUBLIC_URL}/assets/img/Vecteurs/connexion.png`} alt="Img connexion" className='imgConnexion'/>
      <div className='connexion'>
        <h2>Connexion</h2>
        <p className="form-link">
          <Link to="/inscription">Vous n'avez pas de compte ? cliquez ici.</Link>
        </p>
        <div className="form-container">
          <div className="form-box">
            <label className="label">Nom ou Email :</label>
            <input type="text" value={NomOrEmail} onChange={(event) => setNomOrEmail(event.target.value)} placeholder="Votre nom ou email..."/>
            <label className="label">Mot de passe :</label>
            <input type="password" value={Mot_De_Passe} onChange={(event) => setMot_De_Passe(event.target.value)} placeholder="Votre mot de passe..."/>
            <button onClick={login} className="button">Connexion</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnexionForm;
