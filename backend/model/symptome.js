const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const symptomeSchema = new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientH',
        required: true
    },

    message:{
       type: String,
       default:'bonjour dr'
    },

    date:{
        type: Date,
        default: Date.now()
    },

    symptomes:{
        type: [{}],
        required: true,
       
        
    },
    
    
});

symptomeSchema.pre('save' , async function(next){
    if(this.isModified('password') ){
        const hash = await bcrypt.hash(this.password,8);
        this.password = hash;
    }
    next();
});

symptomeSchema.methods.comparePassword = async function(password) {
    const result = await bcrypt.compareSync(password, this.password);
    return result;
}

module.exports = mongoose.model("symptome",symptomeSchema);