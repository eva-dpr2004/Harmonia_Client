import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase'; 
import { FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { SentimentVeryDissatisfied, SentimentNeutral, SentimentVerySatisfied, Reply } from '@mui/icons-material';
import DOMPurify from 'dompurify';
import '../Aides.css'; 
import '../../../styles/Formulaires.css'
import '../../../styles/Boutons.css'

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
    const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const lastSubmissionDate = localStorage.getItem('lastSubmissionDateAvisGlobal');
        const today = new Date().toISOString().split('T')[0];

        if (lastSubmissionDate === today) {
            setIsSubmissionAllowed(false);
        }
    }, []);

    const handleChangeRadio = (event) => {
        setReponses({ ...reponses, [event.target.name]: event.target.value });
    };

    const handleChangeText = (event) => {
        setReponses({ ...reponses, [event.target.name]: event.target.value });
    };

    const validateText = (text, fieldName) => {
        const sanitizedText = DOMPurify.sanitize(text);
        if (sanitizedText.replace(/\s/g, '').length < 3) {
            return `${fieldName} doit contenir au minimum 3 caractères (sans les espaces).`;
        }
        if (sanitizedText.replace(/\s/g, '').length > 500) {
            return `${fieldName} ne peut pas dépasser 500 caractères (sans les espaces).`;
        }
        if (/(?:[A-Z]{2,})/.test(sanitizedText)) {
            return `${fieldName} ne doit pas contenir deux majuscules consécutives.`;
        }
        if (/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(sanitizedText)) {
            return `${fieldName} contient des mots réservés SQL non autorisés.`;
        }
        return '';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isSubmissionAllowed) {
            alert('Vous ne pouvez soumettre ce formulaire qu\'une fois par jour.');
            return;
        }

        const errors = [
            validateText(reponses.suggestions, 'Suggestions')
        ].filter(error => error !== '');

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        const sanitizedResponses = Object.keys(reponses).reduce((acc, key) => {
            acc[key] = DOMPurify.sanitize(reponses[key]);
            return acc;
        }, {});

        try {
            await setDoc(doc(db, "Feedback_Avis_Global", `${Date.now()}`), {
                ...sanitizedResponses,
                timestamp: new Date()
            });

            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem('lastSubmissionDateAvisGlobal', today);
            navigate('/envoie-confirmation');
        } catch (error) {
            console.error("Erreur lors de l'ajout du document: ", error);
            alert('Échec de la soumission du retour. Veuillez réessayer.');
        }
    };

    return (
        <div>
            <img src={`${process.env.PUBLIC_URL}/assets/img/Vecteurs/feedback-rbg.png`} alt="Img connexion" className='imgAvisGlobal'/>
            <h1 className="avis-global-title">
                <Reply 
                    style={{ color: '#183255', cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => navigate(-1)}
                />
                Formulaire d'Avis Global
            </h1>
            {!isSubmissionAllowed && (
                <p className="submission-warning">Vous avez déjà soumis ce formulaire aujourd'hui. Vous pourrez le soumettre à nouveau demain.</p>
            )}
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
                            <FormControlLabel value="graphique" control={<Radio />} label="Cartes durée total d'activités" />
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
                            <FormControlLabel value="graphiqueActivite" control={<Radio />} label="Cartes durée total d'activités" />
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

                <Button type="submit" variant="contained" color="primary" disabled={!isSubmissionAllowed}>Soumettre</Button>
            </form>
        </div>
    );
}

export default FormulaireAvisGlobal;
