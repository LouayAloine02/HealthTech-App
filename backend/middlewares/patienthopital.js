const PatientHopital = require("../models/PatientH")
const ResetToken = require ('../models/resetToken')
const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");

exports.isResetTokenValid = async ( req , res , next) => {
    const {token , id} = req.query ; 
    if(!token || !id) return sendError(res , "invalid request!")
    if (!isValidObjectId(id)) return sendError(res, "invalid patient !");

   const patienthopital =  await PatientHopital.findById(id) ;
   if( ! patienthopital) return sendError(res, "patient not found !") ;


    const resetToken = await ResetToken.findOne({owner:patienthopital._id}) ;
    if (!resetToken) return sendError(res , "reset token not found ") ;
    const isValid = await resetToken.compareToken(token) ;
    if(!isValid) return sendError(res , "reset token is not invalid ") ;

    req.patienthopital = patienthopital
    next()

} 