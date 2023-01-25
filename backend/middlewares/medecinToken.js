const { isValidObjectId } = require("mongoose");
const Medecin = require("../models/medecinModels");
const ResetTokenMedecin = require('../models/resetTokenMedecin');
const { sendError } = require("../utils/helper");

exports.isResetTokenMedecinValid = async (req, res, next) => {
    const { tokenMedecin, id } = req.query;
    if (!tokenMedecin || !id) return sendError(res, 'Demande Invalide!');

    if (!isValidObjectId(id)) return sendError(res, "Medecin invalide!");

    const medecin = await Medecin.findById(id);
    if (!medecin) return sendError(res, "Medecin non trouvé!");

    const resetTokenMedecin = await ResetTokenMedecin.findOne({ owner: medecin._id });
    if (!resetTokenMedecin) return sendError(res, "reset tokenMedecin non trouvé!");

    const isValid = await resetTokenMedecin.compareTokenMedecin(tokenMedecin);
    if (!isValid) return sendError(res, "reset tokenMedecin non valide!");

    req.medecin = medecin;
    next();
}