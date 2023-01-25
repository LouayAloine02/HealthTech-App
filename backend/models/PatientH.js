const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientHopitalSchema = new mongoose.Schema({
    nom:{
        type:String,
        required: true
    },
    prenom:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    hopitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hopital',
        required: true
    },
    motdepasse:{
        type:String,
        required: true,
        
    },
    date_naissance:{
        type:String,
        required: true
    },
    adresse:{
        type:String,
        // required: true
    },
    telephone:{
        type:String,
        required: true
    },
    genre:{
        type:String,
        default: ''
    },  
  
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    type:{
        type:Number,
        required:true
    }
    
},
{
    timestamps: true
});

patientHopitalSchema.pre('save' , async function(next){
    if(this.type==2){
        if(this.isModified('motdepasse') ){
            const hash = await bcrypt.hash(this.motdepasse,8);
            this.motdepasse = hash;
        }
       }
    next();
});

patientHopitalSchema.methods.comparePassword = async function(motdepasse) {
    const result = await bcrypt.compareSync(motdepasse, this.motdepasse);
    return result;
}
const patientH = mongoose.model("patienth",patientHopitalSchema);
module.exports = patientH
