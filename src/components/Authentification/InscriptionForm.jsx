import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../../controllers/Auth";
import { useNavigate, Link } from "react-router-dom";
import './AuthentificationForms.css'; 

function InscriptionForm() {
    const initialValues = {
        Nom: "",
        Email: "",
        Mot_De_Passe: "",
        Confirm_Mot_De_Passe: "",
        acceptTerms: false,
    };

    const validationSchema = Yup.object().shape({
        Nom: Yup.string()
            .matches(/^[\p{L}0-9-_' ]{3,15}$/u, {
                message: "Le nom doit contenir uniquement des lettres, des chiffres ou les caractères -_' et doit avoir entre 3 et 15 caractères.",
            })
            .required("Le nom est requis"),
        Email: Yup.string()
            .email("L'email doit être une adresse email valide")
            .required("L'email est requis"),
        Mot_De_Passe: Yup.string()
            .min(12, "Le mot de passe doit contenir au moins 12 caractères")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,}$/,
                "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial."
            )
            .required("Le mot de passe est requis"),
        Confirm_Mot_De_Passe: Yup.string()
            .oneOf([Yup.ref('Mot_De_Passe'), null], "Les mots de passe doivent correspondre")
            .required("La confirmation du mot de passe est requise"),
        acceptTerms: Yup.boolean()
            .oneOf([true], "Vous devez accepter les termes et conditions pour continuer.")
            .required("L'acceptation des termes et conditions est obligatoire"),
    });

    const navigate = useNavigate();

    const onSubmit = (userData, { setSubmitting }) => {
        createUser(userData).then(() => {
            navigate("/");
            setSubmitting(false);
        }).catch(error => {
            console.error("Erreur lors de l'inscription: ", error);
            setSubmitting(false);
        });
    };

    return (
        <div className="inscription-container">
            <div className="inscription-box"> 
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {({ isSubmitting, values }) => (
                        <Form>
                            <h2>Inscription</h2>
                            <p className="connexion-link">
                                <Link to="/connexion">Vous avez déjà un compte ? cliquez ici.</Link>
                            </p>
                            <label>Nom:</label>
                            <Field name="Nom" type="text" placeholder="Votre nom..." />
                            <ErrorMessage name="Nom" component="div" className="error" />

                            <label>Email:</label>
                            <Field name="Email" type="email" placeholder="Votre email..." />
                            <ErrorMessage name="Email" component="div" className="error" />

                            <label>Mot de Passe:</label>
                            <Field name="Mot_De_Passe" type="password" placeholder="Votre mot de passe..." />
                            <ErrorMessage name="Mot_De_Passe" component="div" className="error" />

                            <label>Confirmer Mot de Passe:</label>
                            <Field name="Confirm_Mot_De_Passe" type="password" placeholder="Confirmez votre mot de passe..." />
                            <ErrorMessage name="Confirm_Mot_De_Passe" component="div" className="error" />

                            <div className="terms">
                                <Field type="checkbox" name="acceptTerms" />
                                <label>
                                    En continuant, vous acceptez nos <a href="/politique-de-confidentialite">Politique de Confidentialité</a>, <a href="/politique-de-cookies">Politique de Cookies</a> et <a href="/mentions-legales">Mentions Légales</a>.
                                </label>
                                <ErrorMessage name="acceptTerms" component="div" className="error" />
                            </div>

                            <button type="submit" disabled={isSubmitting || !values.acceptTerms}>Créer mon compte</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default InscriptionForm;