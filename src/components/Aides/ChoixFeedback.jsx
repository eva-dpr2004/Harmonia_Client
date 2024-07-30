import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Aides.css'; 

function ChoixFeedback() {
    const navigate = useNavigate();

    const handleAnomalyReport = () => {
        navigate('/aides/anomalies'); 
    };

    const handleGeneralFeedback = () => {
        navigate('/aides/avis-global'); 
    };

    return (
        <div className="help-container">
            <div className="text-content">
                <h1>Besoin d'aide ?</h1>
                <p>Vous avez besoin d'aide ? Envie de partager vos idées pour Harmonia ?</p>
                <p>Remplissez les formulaires ci-dessous, ainsi nous pourrons lire vos retours et améliorer la qualité de l'expérience qu'Harmonia propose.</p>
                <button onClick={handleAnomalyReport}>Signalement d'Anomalies</button>
                <button onClick={handleGeneralFeedback}>Feedback Global</button>
            </div>
            <img src={`${process.env.PUBLIC_URL}/assets/img/Question.png`} alt="Help Icon" />
        </div>
    );
}

export default ChoixFeedback;
