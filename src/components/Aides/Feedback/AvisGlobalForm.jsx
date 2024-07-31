import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase'; 
import { FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { SentimentVeryDissatisfied, SentimentNeutral, SentimentVerySatisfied } from '@mui/icons-material';
import '../Aides.css'; 

function FormulaireAvisGlobal() {
    const [reponses, setReponses] = useState({
        decouverte: '',
        fonctionnaliteUtile: '',
        fonctionnaliteUtilisee: '',
        efficaciteNotifications: '',
        frequenceUtilisation: '',
        faciliteUtilisation: '',
        qualiteInterface: '',
        reactiviteApp: '',
        suggestions: '',
        recommandation: ''
    });

    const navigate = useNavigate();

    const handleChangeRadio = (event) => {
        setReponses({ ...reponses, [event.target.name]: event.target.value });
    };

    const handleChangeText = (event) => {
        setReponses({ ...reponses, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await setDoc(doc(db, "Feedback_Avis_Global", `${Date.now()}`), {
                ...reponses,
                timestamp: new Date()
            });
            navigate('/envoie-confirmation'); 
        } catch (error) {
            console.error("Erreur lors de l'ajout du document: ", error);
            alert('Échec de la soumission du retour. Veuillez réessayer.');
        }
    };

    return (
        <div>
            <h1 className="avis-global-title">Formulaire d'Avis Global</h1>
            <form onSubmit={handleSubmit} className="avis-global-form">

                <details>
                    <summary>1. Comment avez-vous découvert Harmonia?</summary>
                    <FormControl component="fieldset">
                        <RadioGroup row name="decouverte" value={reponses.decouverte} onChange={handleChangeRadio}>
                            <FormControlLabel value="parler" control={<Radio />} label="On m'en a parlé" />
                            <FormControlLabel value="reseauxSociaux" control={<Radio />} label="Réseaux Sociaux" />
                            <FormControlLabel value="publicite" control={<Radio />} label="Publicité" />
                            <FormControlLabel value="autres" control={<Radio />} label="Autres" />
                        </RadioGroup>
                    </FormControl>
                </details>

                <details>
                    <summary>2. Quelle fonctionnalité trouvez-vous la plus utile?</summary>
                    <FormControl component="fieldset">
                        <RadioGroup row name="fonctionnaliteUtile" value={reponses.fonctionnaliteUtile} onChange={handleChangeRadio}>
                            <FormControlLabel value="tableauActivités" control={<Radio />} label="Tableau d'activités" />
                            <FormControlLabel value="graphique" control={<Radio />} label="Graphique de moyenne d'activités" />
                            <FormControlLabel value="modificationAnimaux" control={<Radio />} label="Modification des animaux" />
                        </RadioGroup>
                    </FormControl>
                </details>

                <details>
                    <summary>3. Quelle fonctionnalité utilisez-vous le plus?</summary>
                    <FormControl component="fieldset">
                        <RadioGroup row name="fonctionnaliteUtilisee" value={reponses.fonctionnaliteUtilisee} onChange={handleChangeRadio}>
                            <FormControlLabel value="modificationProfil" control={<Radio />} label="Modification du profil" />
                            <FormControlLabel value="ajoutAnimal" control={<Radio />} label="Ajout d'un animal" />
                            <FormControlLabel value="modificationAnimaux" control={<Radio />} label="Modification des animaux" />
                            <FormControlLabel value="tableauActivités" control={<Radio />} label="Tableau d'activités" />
                            <FormControlLabel value="graphiqueActivite" control={<Radio />} label="Graphique de moyenne d'activités" />
                        </RadioGroup>
                    </FormControl>
                </details>

                <details>
                    <summary>4. À quelle fréquence utilisez-vous l'application?</summary>
                    <FormControl component="fieldset">
                        <RadioGroup row name="frequenceUtilisation" value={reponses.frequenceUtilisation} onChange={handleChangeRadio}>
                            <FormControlLabel value="toutLesJours" control={<Radio />} label="Tout les jours" />
                            <FormControlLabel value="toutesLesSemaines" control={<Radio />} label="Toutes les semaines" />
                            <FormControlLabel value="toutLesMois" control={<Radio />} label="Quelques fois dans le mois" />
                        </RadioGroup>
                    </FormControl>
                </details>

                <details>
                    <summary>5. Comment évalueriez-vous la facilité d'utilisation?</summary>
                    <FormControl component="fieldset">
                        <RadioGroup row name="faciliteUtilisation" value={reponses.faciliteUtilisation} onChange={handleChangeRadio}>
                            <FormControlLabel value="difficile" control={<Radio />} label="Difficile" />
                            <FormControlLabel value="moyen" control={<Radio />} label="Moyen" />
                            <FormControlLabel value="facile" control={<Radio />} label="Facile" />
                            <FormControlLabel value="tresFacile" control={<Radio />} label="Très Facile" />
                        </RadioGroup>
                    </FormControl>
                </details>

                <details>
                    <summary>6. Comment évalueriez-vous la qualité de l'interface?</summary>
                    <FormControl component="fieldset">
                        <RadioGroup row name="qualiteInterface" value={reponses.qualiteInterface} onChange={handleChangeRadio}>
                            <FormControlLabel value="passable" control={<Radio />} label="Passable" />
                            <FormControlLabel value="moyenne" control={<Radio />} label="Moyenne" />
                            <FormControlLabel value="agreable" control={<Radio />} label="Agréable" />
                            <FormControlLabel value="tresHarmonieuse" control={<Radio />} label="Très Harmonieuse" />
                        </RadioGroup>
                    </FormControl>
                </details>

                <details>
                    <summary>7. Comment évalueriez-vous la réactivité de l'application?</summary>
                    <FormControl component="fieldset">
                        <RadioGroup row name="reactiviteApp" value={reponses.reactiviteApp} onChange={handleChangeRadio}>
                            <FormControlLabel value="plutotLente" control={<Radio />} label="Plutôt lente" />
                            <FormControlLabel value="plutotRapide" control={<Radio />} label="Plutôt rapide" />
                            <FormControlLabel value="fluide" control={<Radio />} label="Fluide" />
                        </RadioGroup>
                    </FormControl>
                </details>

                <details>
                    <summary>8. Avez-vous des suggestions pour améliorer l'application?</summary>
                    <div style={{ maxHeight: '200px', overflow: 'auto' }}> 
                        <textarea
                            name="suggestions"
                            value={reponses.suggestions}
                            onChange={handleChangeText}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            rows="4"
                            maxLength="500"
                        />
                    </div>
                </details>

                <details>
                    <summary>9. Recommanderiez-vous cette application?</summary>
                    <FormControl component="fieldset">
                        <RadioGroup row name="recommandation" value={reponses.recommandation} onChange={handleChangeRadio}>
                            <FormControlLabel value="pasVraiment" control={<Radio />} label={
                                <div className="icon-label">
                                    <SentimentVeryDissatisfied className="icon" />
                                    <span>Pas vraiment</span>
                                </div>
                            } />
                            <FormControlLabel value="neSaitPas" control={<Radio />} label={
                                <div className="icon-label">
                                    <SentimentNeutral className="icon" />
                                    <span>Ne sait pas</span>
                                </div>
                            } />
                            <FormControlLabel value="oui" control={<Radio />} label={
                                <div className="icon-label">
                                    <SentimentVerySatisfied className="icon" />
                                    <span>Oui</span>
                                </div>
                            } />
                        </RadioGroup>
                    </FormControl>
                </details>

                <Button type="submit" variant="contained" color="primary">Soumettre</Button>
            </form>
        </div>
    );
}

export default FormulaireAvisGlobal;
