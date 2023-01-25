const { isValidObjectId } = require("mongoose");
const Patient = require("../model/patient");
const ResetToken = require('../model/resetTokenPatient');
const { sendError } = require("../utils/helper");

exports.isResetTokenValid = async (req, res, next) => {
    const {token, id} = req.query;
    if(!token || !id) return sendError(res, 'Demande Invalide!');

    if(!isValidObjectId(id)) return sendError(res, "Patient invalide!");

    const patient = await Patient.findById(id);
    if(!patient) return sendError(res, "Patient non trouvé!");

    const resetToken = await ResetToken.findOne({owner: patient._id});
    if(!resetToken) return sendError(res, "reset token non trouvé!");

    const isValid = await resetToken.compareToken(token);
    if(!isValid) return sendError(res, "reset token non valide!");

    req.patient = patient;
    next();
}