const patientmedecin = require("../models/PatientMedecin")
const patientH = require("../models/PatientH")
const medecinH = require("../models/MedecinH")
const Hopital = require ("../models/Hopital")
const { isValidObjectId } = require('mongoose');
const { sendError } = require('../utils/helper');
const ObjectId = require('mongoose').Types.ObjectId;


exports.affecter = async (req, res) => {
   const {id} = req.params
   const { email1, email2 } = req.body
   console.log(email1)
 
   console.log(id)
    if (!isValidObjectId(id)) return sendError(res, 'Hopital id invalide!');

      const hopital = await Hopital.findById(id);

    if (!hopital) return sendError(res, 'hopital non trouvé!');
      const patient = await patientH.findOne({hopitalId:id ,email:email1})
      const medecin = await medecinH.findOne({hopitalId:id,email:email2})
      if (!patient) return sendError(res, 'patient non trouvé!');
      if (!medecin) return sendError(res, 'medecin non trouvé!');
      const newpatientmedecin = new patientmedecin({
         patientId:patient._id,
         medecinId:medecin._id,
         hopitalId:hopital._id,
        
     });
     await newpatientmedecin.save();

res.send(newpatientmedecin)
      
  



}