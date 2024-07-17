import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ProfilStyle.css';

function ProfilCard() {
    const { authState } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({ Nom: '', Email: '' });
    const navigate = useNavigate();

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

    const handleModify = () => {
        navigate('/profil/modifier-profil');
    };

    const handleDelete = () => {
        navigate('/profil/supprimer-profil');
    };

    return (
        <div className="profil-container">
            <h2 className="profil-title">Votre profil</h2>
            <div className="profil-card">
                <div className="profil-icon">
                    <img src={`${process.env.PUBLIC_URL}/assets/img/avatar.png`} alt="Harmonia Logo" />
                </div>
                <div className="profil-info">
                    <div className="profil-field">
                        <span className="label">Nom :</span>
                        <span className="value">{userInfo.Nom}</span>
                    </div>
                    <div className="profil-field">
                        <span className="label">Adresse électronique :</span>
                        <span className="value">{userInfo.Email}</span>
                    </div>
                </div>
                <div className="profil-actions">
                <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={handleModify}
                        sx={{
                            color: '#193356',
                            borderColor: '#193356',
                            '&:hover': {
                                borderColor: '#193356',
                                backgroundColor: 'rgba(25, 51, 86, 0.08)',
                            },
                            '& .MuiButton-startIcon': {
                                color: '#193356',
                            },
                        }}
                    >
                        Modifier mon compte
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                    >
                        Supprimer mon compte
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProfilCard;
