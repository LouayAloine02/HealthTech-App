const mongoose = require('mongoose')

const bcrypt = require('bcrypt');



//l schelma ya3ni 3ibara chnouwa bach nsajl f bd 
const medecinSchema = mongoose.Schema({
    nomMed: {
        type: String,
        //required: false
    },
    prenomMed: {
        type: String,
        //required: true
    },
    date_naissance: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true
    },
    passwordConfirmation: {
        type: String,
        // required: true
    },

    adresse: {
        type: String,
        // required: true
    },
    genre: {
        type: String,
        // required: true
    },
    numTel: {
        type: Number,
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
medecinSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();

        })
    }
})

medecinSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('la confirmation est fausse')

    try {
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error) {
        console.log('erreur dans la comparaison de mot de passe ', error.message)
    }
};
module.exports = mongoose.model("Medecin", medecinSchema);



