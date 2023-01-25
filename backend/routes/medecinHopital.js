const  router = require ('express').Router();
const {affichermedecinH , createMedecinHopital,signin,verifyEmail,InfoMedecin,afficherpatient } = require('../controllers/medecinhopitalcontrollers');
// const { isResetTokenValid } = require('../middlewares/');
const { validate , validateMedecinHopital } = require('../middlewares/validator');

router.get("/afficher/:id", affichermedecinH);

router.get("/afficherpatient/:id", afficherpatient)
router.post('/signin',signin);
router.post('/verify-email',verifyEmail);
// router.post("/forgot-password", forgetPassword) ;
// router.post("/reset-password", isResetTokenValid , resetPassword)
router.get("/profile/:id", InfoMedecin) ;




router.post("/create",  createMedecinHopital ,validate , validateMedecinHopital)
// Public Routes
//router.post('/register', AdminController.adminRegistration);
// router.post('/login', UserController.userLogin)

module.exports = router