const mongoose = require('mongoose');


const protectionSchema = new mongoose.Schema({
    jour:{
        type: String,
       
        required: true,
        
    },
    mois:{
        type: String,
       
        required: true,
        
    },
    annee:{
        type: String,
       
        required: true,
        
    },
    
    heure:{
        type: String,
       
        required: true,
        
    },
    minute:{
        type: String,
       
        required: true,
        
    },
    
    poids:{
        type: String,
        required: true,
       
        
        
    },
   
    calendrierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Calendrier',
       
        
    },
  
    
    
});



module.exports = mongoose.model("protection",protectionSchema);