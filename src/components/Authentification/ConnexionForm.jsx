import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Formulaires.css'; 

function ConnexionForm() {
  const [Nom, setNom] = useState("");
  const [Mot_De_Passe, setMot_De_Passe] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", { withCredentials: true })
      .then((response) => {
        if (!response.data.error) {
          navigate('/');
        }
      });
  }, [navigate]);

  const login = () => {
    if (!Nom || !Mot_De_Passe) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    const data = { Nom: Nom, Mot_De_Passe: Mot_De_Passe };
    axios.post("http://localhost:3001/auth/login", data, { withCredentials: true })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          window.location = '/';
        }
      })
      .catch((error) => {
        alert("Erreur de connexion: " + error.message);
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Connexion</h2>
        <p className="form-link">
          <Link to="/inscription">Vous n'avez pas de compte ? cliquez ici.</Link>
        </p>
        <label className="label">Nom :</label>
        <input
          type="text"
          value={Nom}
          onChange={(event) => setNom(event.target.value)}
          placeholder="Votre nom..."
        />
        <label className="label">Mot de passe :</label>
        <input
          type="password"
          value={Mot_De_Passe}
          onChange={(event) => setMot_De_Passe(event.target.value)}
          placeholder="Votre mot de passe..."
        />
        <button onClick={login} className="button">Login</button>
      </div>
    </div>
  );
}

export default ConnexionForm;
