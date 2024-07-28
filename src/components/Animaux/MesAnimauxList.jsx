import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import AucunAnimal from './AucunAnimal';  

function AnimauxList() {
    const { authState } = useContext(AuthContext);
    const [animaux, setAnimaux] = useState([]);

    useEffect(() => {
        if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
            const url = `http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`;
            axios.get(url, { withCredentials: true })
                .then(response => {
                    console.log('Data received:', response.data); 
                    setAnimaux(response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des animaux:', error);
                });
        }
    }, [authState]);

    const defaultImage = `${process.env.PUBLIC_URL}/assets/img/dog.png`;

    if (animaux.length === 0) {
        return <AucunAnimal />;
    }

    return (
        <div className="animaux-list-container">
            <h2 className='Title-Mes-Animaux'>Mes Animaux</h2>
            <ul>
                {animaux.map(animal => (
                    <li key={animal.Id_Animal}>
                        <img src={animal.photoURL || defaultImage} alt={animal.Nom} className="animal-image"/>
                        <h3>{animal.Nom}</h3>
                        <p>Espèce: {animal.Espece}</p>
                        <p>Race: {animal.Race}</p>
                        <p>Date de Naissance: {animal.Date_De_Naissance}</p>
                        <p>Date d'Adoption: {animal.Date_Adoption}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnimauxList;
