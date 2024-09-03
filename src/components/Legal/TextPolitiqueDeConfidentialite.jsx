import React from 'react';
import './Text.css';

function TextPolitiqueDeConfidentialite() {
  return (
    <div className='LegalContainer'>
      <h2>Politique de Confidentialité</h2>
      <p className='IntroductionParagraphe'>
        Introduction : Votre vie privée est importante pour nous. Cette politique de confidentialité explique quelles données personnelles nous collectons, pourquoi nous les collectons et comment nous les utilisons. En utilisant notre application mobile et notre site web consacrés aux animaux, vous acceptez les termes de cette politique.
      </p>

      <h3>Données collectées :</h3>
      <p>Nous collectons les données suivantes :</p>
      <ul>
        <li>Informations d'inscription : nom, email, mot de passe.</li>
        <li>Informations sur les animaux : nom, date de naissance, espèce, race, poids, habitat, etc.</li>
        <li>Informations d'activité : durée, type, fréquence des activités de vos animaux.</li>
        <li>Données techniques : adresse IP, type de navigateur, temps de visite, etc.</li>
      </ul>

      <h3>Utilisation des données :</h3>
      <p>Nous utilisons vos données pour :</p>
      <ul>
        <li>Fournir et améliorer nos services.</li>
        <li>Personnaliser votre expérience utilisateur.</li>
        <li>Gérer votre compte et vos préférences.</li>
        <li>Communiquer avec vous à propos de nos services.</li>
        <li>Analyser l'utilisation de notre site et de notre application.</li>
      </ul>

      <h3>Partage des données :</h3>
      <p>Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager vos données avec :</p>
      <ul>
        <li>Des prestataires de services qui nous aident à fournir nos services.</li>
        <li>Des autorités légales si cela est requis par la loi.</li>
      </ul>

      <h3>Sécurité des données :</h3>
      <p>Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.</p>

      <h3>Vos droits :</h3>
      <p>Conformément au RGPD, vous avez le droit :</p>
      <ul>
        <li>D'accéder à vos données personnelles.</li>
        <li>De rectifier vos données si elles sont inexactes ou incomplètes.</li>
        <li>De demander la suppression de vos données.</li>
        <li>De limiter le traitement de vos données.</li>
        <li>De vous opposer au traitement de vos données.</li>
        <li>De la portabilité de vos données.</li>
      </ul>
      <p>Pour exercer ces droits, veuillez nous contacter à : harmonia.contactus@gmail.com</p>

      <h3>Modification de la politique :</h3>
      <p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.</p>

      <h3>Contact :</h3>
      <p>Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à : harmonia.contactus@gmail.com</p>
    </div>
  )
}

export default TextPolitiqueDeConfidentialite;
