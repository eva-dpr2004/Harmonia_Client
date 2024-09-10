const Yup = require('yup');

// Schéma de validation pour l'inscription
const validationSchema = Yup.object().shape({
    Nom: Yup.string()
        .required("Le nom est requis")
        .test('no-sql-keywords', 'Le nom ne doit pas contenir des mots réservés SQL', value =>
            !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value))
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\d-_' ]*$/, "Le nom doit contenir uniquement des lettres, des chiffres ou les caractères -_' et doit avoir entre 3 et 15 caractères.")
        .test('contains-min-chars', 'Le nom doit contenir au moins 3 caractères sans les espaces', value =>
            value && value.replace(/\s/g, '').length >= 3)
        .test('contains-max-chars', 'Le nom ne peut pas dépasser 100 caractères sans les espaces', value =>
            value && value.replace(/\s/g, '').length <= 100)
        .test('no-consecutive-uppercase', 'Le nom ne doit pas contenir deux majuscules consécutives', value =>
            !/(?:[A-Z]{2,})/.test(value)),
    Email: Yup.string()
        .email("L'email doit être une adresse email valide")
        .max(320, "L'email ne peut pas dépasser 320 caractères")
        .required("L'email est requis"),
    Mot_De_Passe: Yup.string()
        .min(12, "Le mot de passe doit contenir au moins 12 caractères")
        .max(255, "Le mot de passe ne peut pas dépasser 255 caractères")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{12,}$/,
          "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
        )
        .required("Le mot de passe est requis"),
    Confirm_Mot_De_Passe: Yup.string()
        .oneOf([Yup.ref('Mot_De_Passe'), null], "Les mots de passe doivent correspondre")
        .required("La confirmation du mot de passe est requise"),
    Poids: Yup.string()
        .required('Poids est requis')
        .test('is-valid-number', 'Le poids doit être un nombre valide', value => {
            return /^\d+(\.\d+)?$/.test(value);
        })
        .test('min-value', 'Le poids doit être au minimum de 0.1 kg', value => {
            return parseFloat(value) >= 0.1;
        })
        .test('max-value', 'Le poids ne peut pas dépasser 4000 kg', value => {
            return parseFloat(value) <= 4000;
        }),
    acceptTerms: Yup.boolean()
        .oneOf([true], "Vous devez accepter les termes et conditions pour continuer.")
        .required("L'acceptation des termes et conditions est obligatoire"),
});

module.exports = { validationSchema };
