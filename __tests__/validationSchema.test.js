const { validationSchema } = require('../utils/validationSchema'); 

describe('Validation Schema for Inscription Form', () => {

    test('Valid Nom should pass', async () => {
        const validData = { Nom: 'Jean' };
        await expect(validationSchema.validateAt('Nom', validData)).resolves.toBe(validData.Nom);
    });

    test('Invalid Nom with SQL keyword should fail', async () => {
        const invalidData = { Nom: 'DROP TABLE users' };
        await expect(validationSchema.validateAt('Nom', invalidData)).rejects.toThrow("Le nom ne doit pas contenir des mots réservés SQL");
    });

    test('Valid Email should pass', async () => {
        const validData = { Email: 'jean@example.com' };
        await expect(validationSchema.validateAt('Email', validData)).resolves.toBe(validData.Email);
    });

    test('Invalid Email should fail', async () => {
        const invalidData = { Email: 'invalidemail.com' };
        await expect(validationSchema.validateAt('Email', invalidData)).rejects.toThrow("L'email doit être une adresse email valide");
    });

    test('Valid Mot_De_Passe should pass', async () => {
        const validData = { Mot_De_Passe: 'ValidPass123!' };
        await expect(validationSchema.validateAt('Mot_De_Passe', validData)).resolves.toBe(validData.Mot_De_Passe);
    });

    test('Password confirmation should match password', async () => {
        const validData = { Mot_De_Passe: 'ValidPass123!', Confirm_Mot_De_Passe: 'ValidPass123!' };
        await expect(validationSchema.validateAt('Confirm_Mot_De_Passe', validData)).resolves.toBe(validData.Confirm_Mot_De_Passe);
    });

    test('Password mismatch should fail', async () => {
        const invalidData = { Mot_De_Passe: 'ValidPass123!', Confirm_Mot_De_Passe: 'InvalidPass123!' };
        await expect(validationSchema.validateAt('Confirm_Mot_De_Passe', invalidData)).rejects.toThrow("Les mots de passe doivent correspondre");
    });

    test('User must accept terms to continue', async () => {
        const validData = { acceptTerms: true };
        await expect(validationSchema.validateAt('acceptTerms', validData)).resolves.toBe(validData.acceptTerms);
    });

    test('Not accepting terms should fail', async () => {
        const invalidData = { acceptTerms: false };
        await expect(validationSchema.validateAt('acceptTerms', invalidData)).rejects.toThrow("Vous devez accepter les termes et conditions pour continuer.");
    });
});
