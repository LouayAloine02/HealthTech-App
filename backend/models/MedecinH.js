const mongoose = require('mongoose')

const bcrypt = require('bcrypt');



const medecinHopitalSchema = mongoose.Schema({
    nom: {
        type: String,
        //required: false
    },
    prenom: {
        type: String,
        //required: true
    },
    hopitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hopital',
        required: true
    },
    age: {
        type: Date,
        // required: true
    },
    genre:{
        type:String
    },
    email: {
        type: String,
        // required: true,
        unique: true,
    },
    motdepasse: {
        type: String,
        // required: true
    },
    
    
    telephone: {
        type: String,
        // required: true
    },
    specialite: {
        type: String,
        // required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: true,

    }



},
{
    timestamps: true
});
medecinHopitalSchema.pre('save', function (next) {
    if (this.isModified('motdepasse')) {
        bcrypt.hash(this.motdepasse, 8, (err, hash) => {
            if (err) return next(err);

            this.motdepasse = hash;
            next();

        })
    }
})

medecinHopitalSchema.methods.comparePassword = async function (motdepasse) {
    if (!motdepasse) throw new Error('la confirmation est fausse')

    try {
        const result = await bcrypt.compare(motdepasse, this.motdepasse)
        return result;
    } catch (error) {
        console.log('erreur dans la comparaison de mot de passe ', error.message)
    }
};
const medecinH = mongoose.model("medecinh", medecinHopitalSchema);
module.exports = medecinH





