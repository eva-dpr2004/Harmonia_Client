import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { createUser } from "../../services/Auth";
import { useNavigate, Link } from "react-router-dom";
import '../../styles/Formulaires.css';

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
            .required("Le nom est requis")
            .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9-_' ]*$/, "Le nom doit contenir uniquement des lettres, des chiffres ou les caractères -_' et doit avoir entre 3 et 15 caractères.")
            .test('contains-min-chars', 'Le nom doit contenir au moins 3 caractères sans les espaces', value =>
                value && value.replace(/\s/g, '').length >= 3)
            .test('contains-max-chars', 'Le nom ne peut pas dépasser 15 caractères sans les espaces', value =>
                value && value.replace(/\s/g, '').length <= 15)
            .test('no-consecutive-uppercase', 'Le nom ne doit pas contenir deux majuscules consécutives', value =>
                !/(?:[A-Z]{2,})/.test(value))
            .test('no-sql-keywords', 'Le nom ne doit pas contenir des mots réservés SQL', value =>
                !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
        Email: Yup.string()
            .email("L'email doit être une adresse email valide")
            .required("L'email est requis"),
        Mot_De_Passe: Yup.string()
            .min(12, "Le mot de passe doit contenir au moins 12 caractères")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{12,}$/,
              "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
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

    const onSubmit = (userData, { setSubmitting, setFieldError }) => {
        const sanitizedUserData = {
            ...userData,
            Nom: DOMPurify.sanitize(userData.Nom),
            Email: DOMPurify.sanitize(userData.Email),
            Mot_De_Passe: DOMPurify.sanitize(userData.Mot_De_Passe),
        };

        createUser(sanitizedUserData).then(() => {
            navigate("/connexion");
            setSubmitting(false);
        }).catch(error => {
            console.error("Erreur lors de l'inscription: ", error);
            if (error.response && error.response.data) {
                if (error.response.data.error === "Nom déjà pris") {
                    setFieldError("Nom", "Nom déjà pris");
                } else if (error.response.data.error === "Email déjà pris") {
                    setFieldError("Email", "Email déjà pris");
                } else {
                    setFieldError("submit", "Erreur lors de l'inscription");
                }
            } else {
                setFieldError("submit", "Erreur lors de l'inscription");
            }
            setSubmitting(false);
        });
    };

    return (
        <div className="inscription">
            <img src={`${process.env.PUBLIC_URL}/assets/img/Vecteurs/inscription.png`} alt="Img" className='imgInscription'/>
            <h2>Inscription</h2>
            <p className="form-link">
                <Link to="/connexion">Vous avez déjà un compte ? cliquez ici.</Link>
            </p>
            <div className="form-container">
                <div className="form-box"> 
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({ isSubmitting, values, errors }) => (
                            <Form>
                                <label className="label">Nom:</label>
                                <Field name="Nom" type="text" placeholder="Votre nom..." />
                                <ErrorMessage name="Nom" component="div" className="error" />

                                <label className="label">Email:</label>
                                <Field name="Email" type="email" placeholder="Votre email..." />
                                <ErrorMessage name="Email" component="div" className="error" />

                                <label className="label">Mot de Passe:</label>
                                <Field name="Mot_De_Passe" type="password" placeholder="Votre mot de passe..." />
                                <ErrorMessage name="Mot_De_Passe" component="div" className="error" />

                                <label className="label">Confirmer Mot de Passe:</label>
                                <Field name="Confirm_Mot_De_Passe" type="password" placeholder="Confirmez votre mot de passe..." />
                                <ErrorMessage name="Confirm_Mot_De_Passe" component="div" className="error" />

                                <div className="terms">
                                    <Field type="checkbox" name="acceptTerms" />
                                    <label>
                                        En continuant, vous acceptez nos <a href="/politique-de-confidentialite">Politique de Confidentialité</a>, <a href="/politique-de-cookies">Politique de Cookies</a> et <a href="/mentions-legales">Mentions Légales</a>.
                                    </label>
                                    <ErrorMessage name="acceptTerms" component="div" className="error" />
                                </div>

                                <button type="submit" disabled={isSubmitting || !values.acceptTerms} className="button">Créer mon compte</button>

                                {errors.submit && <div className="error">{errors.submit}</div>}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default InscriptionForm;
