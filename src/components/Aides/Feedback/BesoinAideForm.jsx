import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../../firebase'; 
import ReplyIcon from '@mui/icons-material/Reply';
import '../Aides.css'; 

function BesoinAideForm() {
    const [typeAnomalie, setTypeAnomalie] = useState('');
    const [descriptionAnomalie, setDescriptionAnomalie] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await setDoc(doc(db, "Feedback_Anomalies", `${Date.now()}`), {
            type: typeAnomalie,
            description: descriptionAnomalie,
            timestamp: new Date()
        });        
            navigate('/envoie-confirmation');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Failed to report the anomaly. Please try again.');
        }
    };

    return (
        <div className='besoin-aide-container'>
            <h1 className='besoin-aide-title'>
                <ReplyIcon 
                    style={{ color: '#183255', cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => navigate(-1)}
                />
                Vous avez rencontré une anomalie ? Un problème ?
            </h1>
            <p>Merci de nous aider à améliorer Harmonia en nous rapportant les bugs ou problèmes que vous rencontrez.</p>
            <div className="besoin-aide-form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="type-anomalie">Type d'anomalie :</label>
                    <input 
                        type="text" 
                        id="type-anomalie" 
                        value={typeAnomalie}
                        onChange={(e) => setTypeAnomalie(e.target.value)}
                        placeholder="Exemple : bug"
                    />
                    <label htmlFor="description-anomalie">Description de l'anomalie :</label>
                    <textarea 
                        id="description-anomalie" 
                        value={descriptionAnomalie}
                        onChange={(e) => setDescriptionAnomalie(e.target.value)}
                        placeholder="Ceci est la description d'un bug..."
                    />
                    <button type="submit">Soumettre</button>
                </form>
            </div>
        </div>
    );
}

export default BesoinAideForm;
