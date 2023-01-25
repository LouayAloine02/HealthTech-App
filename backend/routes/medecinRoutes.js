const express = require('express');
const router = express.Router();
const { createMedecin, signIn, verifyEmail, forgotPassword, resetPassword, InfoMedecin, afficherMedecin } = require('../controllers/medecinControllers');
const { validateMedecin, validate, validateLogin } = require('../middlewares/medecinMiddlewares');
const { isResetTokenMedecinValid } = require('../middlewares/medecinToken');


// router.post('/ajouterMedecin', validateMedecin, validate, createMedecin);
// router.get('/login', validateMedecin, validate, signIn);


router.post('/ajouterMedecin', validate, validateMedecin, createMedecin);
router.post('/signin', signIn);
router.post('/verifyEmail', verifyEmail);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", isResetTokenMedecinValid, resetPassword)
router.get('/verify-token', isResetTokenMedecinValid, (req, res) => {
    res.json({ success: true })
});
router.get("/afficher", afficherMedecin);

router.get("/profile/:id", InfoMedecin);
module.exports = router;




