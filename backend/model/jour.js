const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jourSchema = new mongoose.Schema({
    date:{
        type: Date,
       
        default: Date.now()
        
    },
    
    calendrierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Calendrier',
       
        
        
    },
   
    
    
});



module.exports = mongoose.model("jour",jourSchema);