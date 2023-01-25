const  router = require ('express').Router();
const {  signin ,signIn, signInpatient} = require('../controllers/authControllers');

router.post('/signin',signin);
router.post('/signinmedecin',signIn)
router.post('/signinpatient',signInpatient)

module.exports = router