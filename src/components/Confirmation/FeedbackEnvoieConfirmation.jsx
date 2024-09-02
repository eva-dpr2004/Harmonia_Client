import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './Validation.css';

function FeedbackEnvoieConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="validation-container">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        colors={['#a1dffb', '#f9d5bb', '#f28c8c']}
      />
      <h1>Feedback envoyé avec succès !</h1>
      <img src={`${process.env.PUBLIC_URL}/assets/img/chat.png`} alt="Validation" className="validation-image" />
      <p className='para-redirection'>Vous allez être redirigé à la page d'accueil !</p>
    </div>
  );
}

export default FeedbackEnvoieConfirmation