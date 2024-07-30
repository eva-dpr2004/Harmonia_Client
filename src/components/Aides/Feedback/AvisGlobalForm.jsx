import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase'; // Ensure db is correctly imported
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@mui/material';

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
            alert('Retour soumis avec succès!');
        } catch (error) {
            console.error("Erreur lors de l'ajout du document: ", error);
            alert('Échec de la soumission du retour. Veuillez réessayer.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Comment avez-vous découvert Harmonia?</FormLabel>
                <RadioGroup row name="decouverte" value={reponses.decouverte} onChange={handleChangeRadio}>
                    <FormControlLabel value="on m'en à parlé" control={<Radio />} label="Parler" />
                    <FormControlLabel value="reseauxSociaux" control={<Radio />} label="Réseaux Sociaux" />
                    <FormControlLabel value="publicite" control={<Radio />} label="Publicité" />
                    <FormControlLabel value="autres" control={<Radio />} label="autres" />
                </RadioGroup>

                <TextField
                    fullWidth
                    label="Quelle fonctionnalité trouvez-vous la plus utile?"
                    name="fonctionnaliteUtile"
                    value={reponses.fonctionnaliteUtile}
                    onChange={handleChangeText}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Quelle fonctionnalité utilisez-vous le plus?"
                    name="fonctionnaliteUtilisee"
                    value={reponses.fonctionnaliteUtilisee}
                    onChange={handleChangeText}
                    margin="normal"
                />

                <FormLabel component="legend">Les notifications sont-elles efficaces?</FormLabel>
                <RadioGroup row name="efficaciteNotifications" value={reponses.efficaciteNotifications} onChange={handleChangeRadio}>
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                    <FormControlLabel value="parfois" control={<Radio />} label="Parfois" />
                </RadioGroup>

                <TextField
                    fullWidth
                    label="À quelle fréquence utilisez-vous l'application?"
                    name="frequenceUtilisation"
                    value={reponses.frequenceUtilisation}
                    onChange={handleChangeText}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Comment évalueriez-vous la facilité d'utilisation?"
                    name="faciliteUtilisation"
                    value={reponses.faciliteUtilisation}
                    onChange={handleChangeText}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Comment évalueriez-vous la qualité de l'interface?"
                    name="qualiteInterface"
                    value={reponses.qualiteInterface}
                    onChange={handleChangeText}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Comment évalueriez-vous la réactivité de l'application?"
                    name="reactiviteApp"
                    value={reponses.reactiviteApp}
                    onChange={handleChangeText}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Avez-vous des suggestions pour améliorer l'application?"
                    name="suggestions"
                    value={reponses.suggestions}
                    multiline
                    rows={4}
                    onChange={handleChangeText}
                    margin="normal"
                />

                <FormLabel component="legend">Recommanderiez-vous cette application?</FormLabel>
                <RadioGroup row name="recommandation" value={reponses.recommandation} onChange={handleChangeRadio}>
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                </RadioGroup>

                <Button type="submit" variant="contained" color="primary">Soumettre</Button>
            </FormControl>
        </form>
    );
}

export default FormulaireAvisGlobal;