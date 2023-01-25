const  router = require ('express').Router();
const {affecter} =  require("../controllers/patientmedecin")



router.post('/affecter/:id',affecter)


module.exports = router