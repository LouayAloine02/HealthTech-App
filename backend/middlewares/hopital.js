const Hopital = require("../models/Hopital")
const ResetToken = require ('../models/resetToken')
const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");

exports.isResetTokenValid = async ( req , res , next) => {
    const {token , id} = req.query ; 
    if(!token || !id) return sendError(res , "invalid request!")
    if (!isValidObjectId(id)) return sendError(res, "invalid hopital !");

   const hopital =  await Hopital.findById(id) ;
   if( ! hopital) return sendError(res, "hopital not found !") ;


    const resetToken = await ResetToken.findOne({owner:hopital._id}) ;
    if (!resetToken) return sendError(res , "reset token not found ") ;
    const isValid = await resetToken.compareToken(token) ;
    if(!isValid) return sendError(res , "reset token is not invalid ") ;

    req.hopital = hopital
    next()

} 