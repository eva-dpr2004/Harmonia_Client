import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilCard() {
  const [Nom, setNom] = useState('');
  const [Email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios.get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: accessToken,
        },
      }).then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          const userId = response.data.Id_Utilisateur;
          axios.get(`http://localhost:3001/auth/basicinfo/${userId}`, {
            headers: {
              accessToken: accessToken,
            },
          })
          .then(response => {
            setNom(response.data.Nom);
            setEmail(response.data.Email);
          })
          .catch(error => {
            console.error('There was an error!', error);
            setError('Erreur lors de la récupération des informations du profil.');
          });
        }
      }).catch(error => {
        console.error('There was an error!', error);
        setError('Erreur lors de la validation du token.');
      });
    } else {
      setError('Utilisateur non connecté.');
    }
  }, []);

  return (
    <div>
      <h1>Profil Card</h1>
      {error && <p>{error}</p>}
      {!error && (
        <>
          <p>Nom: {Nom}</p>
          <p>Email: {Email}</p>
        </>
      )}
    </div>
  );
}

export default ProfilCard;
