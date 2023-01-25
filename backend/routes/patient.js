


const router = require('express').Router();
const { createPatient, signin, verifyEmail, ViewCalendrier, forgotPassword, afficherpatient, InfoPatient, affecter, resetPassword,
    envoyerSymptome, Voirrev, VoirPatients, saveReveil, saveCalendrier, saveJour, saveCoucher, saveBoisson, saveProtection,
    saveToilette, Voirpro, Voirboi, Voirtoi, Voircou, deleterev, voirSymp, saveQuiz, saveQuestionnaire1, saveQuestionnaire2, saveQuestionnaire3, ViewScore, ViewQuest } = require('../controllers/patient');
const { isResetTokenValid } = require('../middlewares/patient');
const { validatePatient, validate } = require('../middlewares/validator');


router.post('/create', validatePatient, validate, createPatient);
router.post('/signin', signin);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', isResetTokenValid, resetPassword);
router.get('/verify-token', isResetTokenValid, (req, res) => {
    res.json({ success: true })
});

router.get("/afficher", afficherpatient);
router.get("/profile/:id", InfoPatient);
router.post("/affecter", affecter)

router.post('/envoyer-symptome', envoyerSymptome);

router.get("/voir-sym/:id", voirSymp);
router.get('/VoirPatients', VoirPatients);
router.post('/save-calendrier', saveCalendrier);


router.post('/save-reveil', saveReveil);
router.post('/save-coucher', saveCoucher);
router.post('/save-boisson', saveBoisson);
router.post('/save-protection', saveProtection);
router.post('/save-toilette', saveToilette);
router.get('/voir-calendrier/:id', ViewCalendrier);
router.get('/voir-rev/:id', Voirrev);
router.get('/voir-cou/:id', Voircou);
router.get('/voir-toi/:id', Voirtoi);
router.get('/voir-pro/:id', Voirpro);
router.get('/voir-boi/:id', Voirboi);

router.get('/delete-rev', deleterev);




router.post('/save-quiz/:id', saveQuiz);
router.post('/save-questionnaire1/:id', saveQuestionnaire1);
router.post('/save-questionnaire2/:id', saveQuestionnaire2);
router.post('/save-questionnaire3/:id', saveQuestionnaire3);
router.get('/afficher-score/:id', ViewScore);
router.get('/afficher-questionnaire/:id', ViewQuest);





module.exports = router;