const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { sendError } = require('../utils/helper');
const medecin = require('./medecinModels');

const resetTokenMedecinSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medecin',
        required: true

    },
    tokenMedecin: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()

    }
});

resetTokenMedecinSchema.pre('save', async function (next) {
    if (this.isModified("tokenMedecin")) {
        const hash = await bcrypt.hash(this.tokenMedecin, 8);
        this.tokenMedecin = hash;
    }
    next();
});

resetTokenMedecinSchema.methods.compareTokenMedecin = async function (tokenMedecin) {
    const result = await bcrypt.compareSync(tokenMedecin, this.tokenMedecin);
    return result;
};



module.exports = mongoose.model("resetTokenMedecin", resetTokenMedecinSchema); 