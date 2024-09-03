# Harmonia - Frontend (Client)

## Description

**Harmonia** est une application web développée en React.js. Cette application permet aux utilisateurs de gérer des profils, ajouter et gérer des animaux, consulter des activités, et plus encore. L'interface utilisateur est optimisée pour une expérience fluide, avec un design réactif et des fonctionnalités complètes de gestion des données utilisateur.

## Structure du Projet

Le projet est organisé comme suit :

- **`public/`** : Contient les fichiers publics accessibles directement, incluant le fichier `index.html` qui charge l'application React, ainsi que le dossier `assets/` qui contient les images et autres ressources statiques.
  - `index.html` : Fichier HTML principal.
  - `assets/` : Contient les images du projet.

- **`src/`** : Contient tout le code source de l'application React.
  - **`components/`** : Composants React utilisés à travers l'application.
  - **`context/`** : Contient les contextes utilisés pour gérer l'état global de l'application (par exemple, `AuthContext`, `AnimalContext`).
  - **`pages/`** : Composants de page représentant les différentes vues de l'application.
  - **`restrictions/`** : Contient les utilitaires pour appliquer des restrictions, comme la désactivation du clic droit.
  - **`services/`** : Contient les services pour interagir avec les APIs.
  - **`styles/`** : Fichiers CSS utilisés pour styliser l'application.
  - **`App.js`** : Composant principal qui encapsule l'application et définit la structure générale.
  - **`Router.js`** : Fichier de routage pour gérer les différentes routes de l'application.
  - **`index.js`** : Point d'entrée principal de l'application.
  - **`firebase.js`** : Configuration de Firebase pour l'intégration des services backend.
  - **`TokenChecker.js`** : Vérifie les tokens pour l'authentification.
  - **`reportWebVitals.js`** : Utilisé pour mesurer et analyser les performances de l'application.

## Prérequis

- Node.js (version recommandée : 14.x ou supérieure)
- npm ou yarn

## Installation

1. **Cloner le dépôt (m'est réservé):**

   ```bash
   git clone https://github.com/eva-dpr2004/harmonia-client.git
   cd harmonia-client

Installer les dépendances : npm install


Configurer les variables d'environnement :
Créez un fichier .env dans le répertoire racine du projet et ajoutez les variables d'environnement nécessaires.

Lancer l'application (temporairement en local) : npm start

L'application sera accessible à l'adresse http://localhost:3000.
Scripts Disponibles

    npm start : Démarre l'application en mode développement.
    npm run build : Compile l'application pour la production.
    npm test : Lance les tests.
    npm run eject : Ejecte la configuration par défaut de Create React App (attention, cette action est irréversible).

Technologies Utilisées

    React : Bibliothèque JavaScript pour la création d'interfaces utilisateur.
    React Router DOM : Gestion des routes de l'application.
    Firebase : Backend as a Service pour l'authentification et la gestion des données.
    Axios : Client HTTP pour effectuer des requêtes API.
    MUI (Material-UI) : Librairie de composants React pour un design cohérent.
    Formik & Yup : Gestion des formulaires et validation.
    CSS Modules : Pour le stylisme des composants.

Contexte et Gestion de l'État

L'application utilise React Context pour gérer l'état global comme l'authentification des utilisateurs (AuthContext) et la gestion des animaux (AnimalContext).
Sécurité et Restrictions

Le projet inclut un script pour désactiver le clic droit (situé dans restrictions/disableRightClick.js) afin de restreindre certaines actions utilisateur.
Déploiement

Pour créer un build de production, utilisez :

bash

npm run build

Le build sera optimisé pour la performance. Vous pouvez ensuite déployer le contenu du dossier build/ sur un serveur statique.
Auteure

Eva de Palma-Rosario