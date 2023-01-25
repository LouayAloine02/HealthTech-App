const  router = require ('express').Router();
const { resetPassword,forgetPassword, createAdmin, afficheradmin , signin , verifyEmail, InfoAdmin, updateAdmin, deleteAdmin} = require('../controllers/adminControllers');
const { validateAdmin, validate } = require('../middlewares/validator');
const { isResetTokenValid } = require('../middlewares/admin');

router.get("/afficher", afficheradmin);


router.post('/signin',signin);
router.post('/verify-email',verifyEmail);
router.get("/profile/:id",InfoAdmin) ;
router.put("/update/:id", updateAdmin);
router.delete('/delete/:id', deleteAdmin);
router.post("/forgot-password", forgetPassword) ;
router.post("/reset-password", isResetTokenValid , resetPassword)
router.get("/verify-token", isResetTokenValid , (req,res)=> {
    res.json({success: true})
})


router.post("/create",  createAdmin ,validate , validateAdmin)
// Public Routes
//router.post('/register', AdminController.adminRegistration);
// router.post('/login', UserController.userLogin)

module.exports = router