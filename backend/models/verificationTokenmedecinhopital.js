const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const verificationTokenMedecinHopitalSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedecinH',
        required: true

    },
    token:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        expires: 3600,
        default: Date.now()

    }
});

verificationTokenMedecinHopitalSchema.pre('save' , async function(next){
    if(this.isModified("token") ){
        const hash = await bcrypt.hash(this.token,8);
        this.token = hash;
    }
    next();
});

verificationTokenMedecinHopitalSchema.methods.compareToken = async function(token) {
    const result = await bcrypt.compareSync(token, this.token);
    return result;
};



module.exports = mongoose.model("verificationTokenmedecinhopital",verificationTokenMedecinHopitalSchema);