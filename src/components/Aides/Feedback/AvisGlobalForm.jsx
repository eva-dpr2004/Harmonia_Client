import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase'; // Ensure db is correctly imported
import { FormControl, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@mui/material';

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
        <form onSubmit={handleSubmit} className="avis-global-form">
            <h1>Formulaire d'Avis Global</h1>

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
                <RadioGroup row name="fonctionnaliteUtile" value={reponses.fonctionnaliteUtile} onChange={handleChangeRadio}>
                        <FormControlLabel value="tableauActivités" control={<Radio />} label="Tableau d'activités" />
                        <FormControlLabel value="graphique" control={<Radio />} label="Graphique de moyenne d'activités" />
                        <FormControlLabel value="modificationAnimaux" control={<Radio />} label="Modification des animaux" />
                </RadioGroup>
            </details>

            <details>
                <summary>3. Quelle fonctionnalité utilisez-vous le plus?</summary>
                <FormControl component="fieldset">
                    <RadioGroup row name="decouverte" value={reponses.decouverte} onChange={handleChangeRadio}>
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
                    <RadioGroup row name="decouverte" value={reponses.decouverte} onChange={handleChangeRadio}>
                        <FormControlLabel value="toutLesJours" control={<Radio />} label="Tout les jours" />
                        <FormControlLabel value="toutesLesSemaines" control={<Radio />} label="Toutes les semaines" />
                        <FormControlLabel value="toutLesMois" control={<Radio />} label="Quelques fois dans le mois" />
                    </RadioGroup>
                </FormControl>
            </details>

            <details>
                <summary>5. Comment évalueriez-vous la facilité d'utilisation?</summary>
                <FormControl component="fieldset">
                    <RadioGroup row name="decouverte" value={reponses.decouverte} onChange={handleChangeRadio}>
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
                    <RadioGroup row name="decouverte" value={reponses.decouverte} onChange={handleChangeRadio}>
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
                    <RadioGroup row name="decouverte" value={reponses.decouverte} onChange={handleChangeRadio}>
                        <FormControlLabel value="plutotLente" control={<Radio />} label="Plutôt lente" />
                        <FormControlLabel value="plutotRapide" control={<Radio />} label="Plutôt rapide" />
                        <FormControlLabel value="fluide" control={<Radio />} label="Fluide" />
                    </RadioGroup>
                </FormControl>
            </details>

            <details>
                <summary>8. Avez-vous des suggestions pour améliorer l'application?</summary>
                <TextField
                    fullWidth
                    name="suggestions"
                    value={reponses.suggestions}
                    multiline
                    rows={4}
                    onChange={handleChangeText}
                    margin="normal"
                />
            </details>

            <details>
                <summary>9. Recommanderiez-vous cette application?</summary>
                <FormControl component="fieldset">
                    <RadioGroup row name="recommandation" value={reponses.recommandation} onChange={handleChangeRadio}>
                        <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                        <FormControlLabel value="non" control={<Radio />} label="Non" />
                    </RadioGroup>
                </FormControl>
            </details>

            <Button type="submit" variant="contained" color="primary">Soumettre</Button>
        </form>
    );
}

export default FormulaireAvisGlobal;
