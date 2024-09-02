import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import './ProfilStyle.css';
import { getUserInfo } from '../../services/Users'; 

function ProfilCard() {
    const { authState } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({ Nom: '', Email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
            getUserInfo(authState.user.Id_Utilisateur)  
                .then(response => {
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
                <div className="profil-avatar">
                    <Avatar sx={{ width: 80, height: 80, bgcolor: '#193356' }}>
                        {userInfo.Nom.charAt(0)}
                    </Avatar>
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
