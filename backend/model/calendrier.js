const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const calendrierSchema = new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientH',
        required: true
    },
    jourd:{
        type: String,
       
        required: true,
        
    },
    moisd:{
        type: String,
       
        required: true,
        
    },
    anneed:{
        type: String,
       
        required: true,
        
    },
    createdAt:{
        type: Date,
        
        default: Date.now()

    }

  
    
    
});

calendrierSchema.methods.compareDate = async function() {
    const now = moment().format('L');
    if (now == moment(this.date).format('L')) return True

}



module.exports = mongoose.model("calendrier",calendrierSchema);