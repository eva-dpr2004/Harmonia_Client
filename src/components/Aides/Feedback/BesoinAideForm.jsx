import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../../firebase'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DOMPurify from 'dompurify'; 
import ReplyIcon from '@mui/icons-material/Reply';
import '../Aides.css'; 
import '../../../styles/Formulaires.css';
import '../../../styles/Boutons.css';

const BesoinAideForm = () => {
    const navigate = useNavigate();
    const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(true);

    useEffect(() => {
        const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');
        const today = new Date().toISOString().split('T')[0]; 

        if (lastSubmissionDate === today) {
            setIsSubmissionAllowed(false);
        }
    }, []);

    const validationSchema = Yup.object().shape({
        typeAnomalie: Yup.string()
            .required('Le type d\'anomalie est requis')
            .test('len', 'Le type d\'anomalie doit contenir au minimum 3 caractères (sans les espaces)', 
                value => value && value.replace(/\s/g, '').length >= 3)
            .test('len', 'Le type d\'anomalie ne peut pas dépasser 100 caractères (sans les espaces)', 
                value => value && value.replace(/\s/g, '').length <= 100)
            .test('no-consecutive-uppercase', 'Le type d\'anomalie ne doit pas contenir deux majuscules consécutives', 
                value => !/(?:[A-Z]{2,})/.test(value)) 
            .test('no-sql-keywords', 'Le type d\'anomalie ne doit pas contenir des mots réservés SQL', 
                value => !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)), 
        descriptionAnomalie: Yup.string()
            .required('La description de l\'anomalie est requise')
            .test('len', 'La description de l\'anomalie doit contenir au minimum 30 caractères (sans les espaces)', 
                value => value && value.replace(/\s/g, '').length >= 30)
            .test('len', 'La description de l\'anomalie ne peut pas dépasser 500 caractères (sans les espaces)', 
                value => value && value.replace(/\s/g, '').length <= 500)
            .test('no-consecutive-uppercase', 'La description ne doit pas contenir deux majuscules consécutives', 
                value => !/(?:[A-Z]{2,})/.test(value)) 
            .test('no-sql-keywords', 'La description ne doit pas contenir des mots réservés SQL', 
                value => !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)), 
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        if (!isSubmissionAllowed) {
            alert('Vous ne pouvez soumettre ce formulaire qu\'une fois par jour.');
            setSubmitting(false);
            return;
        }

        const sanitizedTypeAnomalie = DOMPurify.sanitize(values.typeAnomalie);
        const sanitizedDescriptionAnomalie = DOMPurify.sanitize(values.descriptionAnomalie);

        try {
            await setDoc(doc(db, "Feedback_Anomalies", `${Date.now()}`), {
                type: sanitizedTypeAnomalie,
                description: sanitizedDescriptionAnomalie,
                timestamp: new Date()
            });

            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem('lastSubmissionDate', today);

            navigate('/envoie-confirmation');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Failed to report the anomaly. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='besoin-aide-container'>
            <img src={`${process.env.PUBLIC_URL}/assets/img/Vecteurs/imprevu.png`} alt="Img Imprevu" className='imgImprevu'/>
            <h1 className='besoin-aide-title'>
                <ReplyIcon 
                    style={{ color: '#183255', cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => navigate(-1)}
                />
                Vous avez rencontré une anomalie ?
            </h1>
            <p>Merci de nous aider à améliorer Harmonia en nous rapportant les bugs ou problèmes que vous rencontrez.</p>
            <div className="besoin-aide-form">
                {!isSubmissionAllowed && (
                    <p className="submission-warning">Vous avez déjà rempli ce formulaire aujourd'hui. Vous pourrez le soumettre à nouveau demain.</p>
                )}
                <Formik
                    initialValues={{ typeAnomalie: '', descriptionAnomalie: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <label htmlFor="type-anomalie">Type d'anomalie :</label>
                            <Field type="text" id="type-anomalie" name="typeAnomalie" placeholder="Type d'anomalie rencontré"/>
                            <ErrorMessage name="typeAnomalie" component="div" className="error-message" />

                            <label htmlFor="description-anomalie">Description de l'anomalie :</label>
                            <Field as="textarea" id="description-anomalie" name="descriptionAnomalie" placeholder="Inscrivez la description ici"/>
                            <ErrorMessage name="descriptionAnomalie" component="div" className="error-message" />

                            <button type="submit" className='button' disabled={isSubmitting || !isSubmissionAllowed}>Soumettre</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default BesoinAideForm;
