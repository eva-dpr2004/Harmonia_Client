import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    Nom: Yup.string()
        .required("Le nom est requis")
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9-_' ]*$/, "Le nom doit contenir uniquement des lettres, des chiffres ou les caractères -_' et doit avoir entre 3 et 15 caractères.")
        .test('contains-min-chars', 'Le nom doit contenir au moins 3 caractères sans les espaces', value =>
            value && value.replace(/\s/g, '').length >= 3)
        .test('contains-max-chars', 'Le nom ne peut pas dépasser 100 caractères sans les espaces', value =>
            value && value.replace(/\s/g, '').length <= 100)
        .test('no-consecutive-uppercase', 'Le nom ne doit pas contenir deux majuscules consécutives', value =>
            !/(?:[A-Z]{2,})/.test(value))
        .test('no-sql-keywords', 'Le nom ne doit pas contenir des mots réservés SQL', value =>
            !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
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
    acceptTerms: Yup.boolean()
        .oneOf([true], "Vous devez accepter les termes et conditions pour continuer.")
        .required("L'acceptation des termes et conditions est obligatoire"),
});
