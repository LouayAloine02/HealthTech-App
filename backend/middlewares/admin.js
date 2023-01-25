const Admin = require("../models/Admin")
const ResetToken = require ('../models/resetToken')
const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");

exports.isResetTokenValid = async ( req , res , next) => {
    const {token , id} = req.query ; 
    if(!token || !id) return sendError(res , "invalid request!")
    if (!isValidObjectId(id)) return sendError(res, "invalid admin !");

   const admin =  await Admin.findById(id) ;
   if( ! admin) return sendError(res, "admin not found !") ;


    const resetToken = await ResetToken.findOne({owner:admin._id}) ;
    if (!resetToken) return sendError(res , "reset token not found ") ;
    const isValid = await resetToken.compareToken(token) ;
    if(!isValid) return sendError(res , "reset token is not invalid ") ;

    req.admin = admin
    next()

} 