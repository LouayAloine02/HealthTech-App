const  router = require ('express').Router();
const { afficherpatientH ,createPatientHopital,  signin , verifyEmail, InfoPatient} = require('../controllers/patienthopitalcontrollers');
const { isResetTokenValid } = require('../middlewares/hopital');
const { validatePatientHopital, validate } = require('../middlewares/validator');

router.get("/afficher/:id", afficherpatientH);


router.post('/signin',signin);
router.post('/verify-email',verifyEmail);
// router.post("/forgot-password", forgetPassword) ;
// router.post("/reset-password", isResetTokenValid , resetPassword)
router.get("/profile/:id", InfoPatient) ;




router.post("/create",  createPatientHopital ,validate , validatePatientHopital)
// Public Routes
//router.post('/register', AdminController.adminRegistration);
// router.post('/login', UserController.userLogin)

module.exports = router