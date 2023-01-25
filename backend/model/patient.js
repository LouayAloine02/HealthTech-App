const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required: true,
        
    },
    date_naissance:{
        type:String,
        required: true
    },
    
    
    adresse:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    photo:{
        type:String,
        default: ''
    },
    genre:{
        type:String,
        required: true,
      
    },
    type:{
        type:Number,
        required:true
    },
   
  
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    
});

patientSchema.pre('save' , async function(next){
    if(this.isModified('password') ){
        const hash = await bcrypt.hash(this.password,8);
        this.password = hash;
    }
    next();
});

patientSchema.methods.comparePassword = async function(password) {
    const result = await bcrypt.compareSync(password, this.password);
    return result;
}

module.exports = mongoose.model("patient",patientSchema);