const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientmedecinSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patienth',
    },

    medecinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medecinh',
    },
    hopitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hopital',
    },
})

patientmedecinSchema.pre('save' , async function(next){
    if(this.isModified('motdepasse') ){
        const hash = await bcrypt.hash(this.motdepasse,8);
        this.motdepasse = hash;
    }
    next();
});

patientmedecinSchema.methods.comparePassword = async function(motdepasse) {
    const result = await bcrypt.compareSync(motdepasse, this.motdepasse);
    return result;
}
const patientmedecin = mongoose.model("patientmedecin",patientmedecinSchema);
module.exports = patientmedecin
