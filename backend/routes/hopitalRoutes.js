const  router = require ('express').Router();
const { createHopital, afficherHopital , signin , verifyEmail, forgetPassword, resetPassword, InfoHopital, updateHopital} = require('../controllers/hopitalControllers');
const { isResetTokenValid } = require('../middlewares/hopital');
const { validateHopital, validate } = require('../middlewares/validator');

router.get("/afficher", afficherHopital);


router.post('/signin',signin);
router.get("/profile/:id",InfoHopital) ;
router.put("/update/:id", updateHopital);

router.post('/verify-email',verifyEmail);
router.post("/forgot-password", forgetPassword) ;
router.post("/reset-password", isResetTokenValid , resetPassword)




router.post("/create",  createHopital ,validate , validateHopital)
// Public Routes
//router.post('/register', AdminController.adminRegistration);
// router.post('/login', UserController.userLogin)

module.exports = router