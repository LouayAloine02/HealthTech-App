const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({

    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        enum: ['Femme', 'Homme']
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    telephone: {
        type: String,
        // required: true
    },
    adresse :{
        type: String,
    } ,
    motdepasse: {
        type: String,
        required: true
    } ,
    verified: {
        type: Boolean,
        default: false,
        required: true
    },

},
{
    timestamps: true
})
adminSchema.pre('save' , async function(next){
    if(this.isModified('motdepasse') ){
        const hash = await bcrypt.hash(this.motdepasse,8);
        this.motdepasse = hash;
    }
    next();
});

adminSchema.methods.comparePassword = async function(motdepasse) {
    const result = await bcrypt.compareSync(motdepasse, this.motdepasse);
    return result;
}
const Admin = mongoose.model('admin',adminSchema)
module.exports = Admin 