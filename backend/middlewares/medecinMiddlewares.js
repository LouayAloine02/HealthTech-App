const { check, validationResult } = require('express-validator');

exports.validateMedecin = [

    check("nomMed")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Nom manquant")
        .isLength({ min: 3, max: 20 })
        .withMessage("Le nom doit avoir une longueur entre 3 et 20 caractères"),
    check("prenomMed")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Prénom manquant")
        .isLength({ min: 3, max: 20 })
        .withMessage("Le prénom doit avoir une longueur entre 3 et 20 caractères"),

    check("age")
        .trim()
        .not()
        .isEmpty()
        .withMessage("L'age est invalide"),


    check("email")

        .isEmail()
        .withMessage("L'Email est invalide"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Mot de passe manquant")
        .isLength({ min: 3, max: 20 })
        .withMessage("Le mot de passe doit avoir une longueur entre 8 et 20 caractères!"),

    check("passwordConfirmation")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Mot de passe manquant")
        .isLength({ min: 3, max: 20 })
        .withMessage("Le mot de passe doit avoir une longueur entre 8 et 20 caractères!"),

    check("adresse")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Adresse manquant")
        .isLength({ min: 3, max: 20 })
        .withMessage("Adresse doit avoir une longueur entre 8 et 20 caractères!"),

    check("numTel")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Numéro de téléphone manquant")
        .isLength({ min: 8, max: 20 })
        .withMessage("Numéro de téléphone doit avoir une longueur entre 8 et 20 caractères!"),

    check("specialite")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Spécialité manquant")
        .isLength({ min: 8, max: 20 })
        .withMessage(" Spécialité doit avoir une longueur entre 8 et 20 caractères!"),



];
exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (!error.length) return next();

    res.status(400).json({ success: false, error: error[0].msg });



};


exports.validateLogin = [
    check('email').trim().isEmail().withMessage('email/password is required'),
    check('password').trim().not().isEmpty().withMessage('email/password is required')
]