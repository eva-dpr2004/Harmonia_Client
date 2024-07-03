import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../controllers/Auth';
import AuthContext from '../../context/AuthContext';

function ConnexionForm() {
    const [identifier, setIdentifier] = useState("");
    const [Mot_De_Passe, setMot_De_Passe] = useState("");
    const { setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = () => {
        const userData = { identifier: identifier, Mot_De_Passe: Mot_De_Passe };
        loginUser(userData).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({ Nom: response.data.Nom, Id_Utilisateur: response.data.Id_Utilisateur, status: true });
                navigate('/');
            }
        });
    };

    return (
        <div className="loginContainer">
            <label>Nom ou Email : </label>
            <input type="text" onChange={(event) => setIdentifier(event.target.value)} />
            <label>Mot de passe : </label>
            <input type="password" onChange={(event) => setMot_De_Passe(event.target.value)} />
            <button onClick={login}> Me connecter </button>
        </div>
    );
}

export default ConnexionForm;
