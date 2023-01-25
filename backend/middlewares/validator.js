const {check, validationResult} = require("express-validator");

exports.validateAdmin = [

    check("nom")
       .trim()
       .not()
       .isEmpty()
       .withMessage("Nom manquant")
       .isLength({min: 3,max: 20})
       .withMessage("Le nom doit avoir une longueur entre 3 et 20 caractères"),
    check("prenom")
       .trim()
       .not()
       .isEmpty()
       .withMessage("Prénom manquant")
       .isLength({min: 3,max: 20})
       .withMessage("Le prénom doit avoir une longueur entre 3 et 20 caractères"),
    check("email")
       
       .isEmail()
       .withMessage("L'Email est invalide"),
    check("motdepasse")
       .trim()
       .not()
       .isEmpty()
       .withMessage("Mot de passe manquant")
       .isLength({min: 8,max: 20})
       .withMessage("Le mot de passe doit avoir une longueur entre 8 et 20 caractères!"),
     
       
];
exports.validateHopital = [

   check("nom")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Nom manquant")
      .isLength({min: 3,max: 20})
      .withMessage("Le nom doit avoir une longueur entre 3 et 20 caractères"),
   check("prenom")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Prénom manquant")
      .isLength({min: 3,max: 20})
      .withMessage("Le prénom doit avoir une longueur entre 3 et 20 caractères"),
   check("email")
      
      .isEmail()
      .withMessage("L'Email est invalide"),
   check("motdepasse")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Mot de passe manquant")
      .isLength({min: 8,max: 20})
      .withMessage("Le mot de passe doit avoir une longueur entre 8 et 20 caractères!"),
    
      
];
exports.validatePatient = [

   check("nom")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Nom manquant")
      .isLength({min: 3,max: 20})
      .withMessage("Le nom doit avoir une longueur entre 3 et 20 caractères"),
   check("prenom")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Prénom manquant")
      .isLength({min: 3,max: 20})
      .withMessage("Le prénom doit avoir une longueur entre 3 et 20 caractères"),
   check("email")
      
      .isEmail()
      .withMessage("L'Email est invalide"),
   check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Mot de passe manquant")
      .isLength({min: 8,max: 20})
      .withMessage("Le mot de passe doit avoir une longueur entre 8 et 20 caractères!"),
    
      
];
exports.validatePatientHopital = [

   check("nom")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Nom manquant")
      .isLength({min: 3,max: 20})
      .withMessage("Le nom doit avoir une longueur entre 3 et 20 caractères"),
   check("prenom")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Prénom manquant")
      .isLength({min: 3,max: 20})
      .withMessage("Le prénom doit avoir une longueur entre 3 et 20 caractères"),
   check("email")
      
      .isEmail()
      .withMessage("L'Email est invalide"),
   check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Mot de passe manquant")
      .isLength({min: 8,max: 20})
      .withMessage("Le mot de passe doit avoir une longueur entre 8 et 20 caractères!"),
    
      
];
exports.validateMedecinHopital = [

   check("nom")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Nom manquant")
      .isLength({min: 3,max: 20})
      .withMessage("Le nom doit avoir une longueur entre 3 et 20 caractères"),
   check("prenom")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Prénom manquant")
      .isLength({min: 3,max: 20})
      .withMessage("Le prénom doit avoir une longueur entre 3 et 20 caractères"),
   check("email")
      
      .isEmail()
      .withMessage("L'Email est invalide"),
   check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Mot de passe manquant")
      .isLength({min: 8,max: 20})
      .withMessage("Le mot de passe doit avoir une longueur entre 8 et 20 caractères!"),
    
      
];
exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if(!error.length) return next();
   
    res.status(400).json({success: false, error: error[0].msg});
    
           
};