import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import DOMPurify from 'dompurify'; 
import '../../styles/Formulaires.css';
import { checkAuthStatus, loginUser } from '../../services/Auth'; 

function ConnexionForm() {
  const [NomOrEmail, setNomOrEmail] = useState("");
  const [Mot_De_Passe, setMot_De_Passe] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    NomOrEmail: Yup.string()
      .required("Le nom ou l'email est requis")
      .test(
        'is-valid',
        "Le nom ou l'email doit être valide",
        value => value && (Yup.string().email().isValidSync(value) || /^[\p{L}0-9-_' ]{3,15}$/u.test(value.replace(/\s/g, ''))) 
      )
      .test('no-sql-keywords', 'Le nom ou l\'email ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value.replace(/\s/g, ''))), 
    Mot_De_Passe: Yup.string()
      .min(12, "Le mot de passe doit contenir au moins 12 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{12,}$/,
        "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
      )
      .required("Le mot de passe est requis"),
  });

  useEffect(() => {
    checkAuthStatus()  
      .then((response) => {
        if (!response.error) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification de l'authentification:", error);
      });
  }, [navigate]);

  const login = async () => {
    try {
      await validationSchema.validate({ NomOrEmail, Mot_De_Passe });

      const sanitizedData = {
        NomOrEmail: DOMPurify.sanitize(NomOrEmail),
        Mot_De_Passe: DOMPurify.sanitize(Mot_De_Passe)
      };

      const response = await loginUser(sanitizedData);  

      if (response.error) {
        setErrorMessage(response.error);
      } else {
        window.location = '/profil';
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.message);
      } else if (error.response && error.response.status === 403 && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Erreur de connexion: Veuillez réessayer.");
      }
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
            {errorMessage && <p className="error">{errorMessage}</p>}
            <label htmlFor="NomOrEmail" className="label">Nom ou Email :</label>
            <input id="NomOrEmail" type="text" value={NomOrEmail} onChange={(event) => setNomOrEmail(event.target.value)} placeholder="Votre nom ou email..."/>
            <label htmlFor="Mot_De_Passe" className="label">Mot de passe :</label>
            <input id="Mot_De_Passe" type="password" value={Mot_De_Passe} onChange={(event) => setMot_De_Passe(event.target.value)} placeholder="Votre mot de passe..."/>
            <button onClick={login} className="button">Connexion</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnexionForm;
