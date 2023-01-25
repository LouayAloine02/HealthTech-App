const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const hopitalSchema = mongoose.Schema({

    nom: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        unique: true,
        required: true
    },
    adresse: {
        type: String,
         required: true
    },
    telephone: {
        type: String,
         required: true
    },
    motdepasse: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    }

},
{
    timestamps: true
})
hopitalSchema.pre('save' , async function(next){
    if(this.isModified('motdepasse') ){
        const hash = await bcrypt.hash(this.motdepasse,8);
        this.motdepasse = hash;
    }
    next();
});

hopitalSchema.methods.comparePassword = async function(motdepasse) {
    const result = await bcrypt.compareSync(motdepasse, this.motdepasse);
    return result;
}
const Hopital = mongoose.model('hopital', hopitalSchema);
module.exports = Hopital 