import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function ProfilCard() {
    const { authState } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({ Nom: '', Email: '' });

    useEffect(() => {
        console.log('authState:', authState); 
        if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
            const url = `http://localhost:3001/auth/basicinfo/${authState.user.Id_Utilisateur}`;
            axios.get(url, { withCredentials: true })
                .then(response => {
                    console.log('Data received:', response.data); 
                    if (response.data) {
                        setUserInfo({ Nom: response.data.Nom, Email: response.data.Email });
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des informations utilisateur:', error);
                });
        }
    }, [authState]);

    return (
        <div>
            <h1>Profil</h1>
            <p>Votre Nom: {userInfo.Nom}</p>  
            <p>Votre Email: {userInfo.Email}</p> 
        </div>
    );
}

export default ProfilCard;
