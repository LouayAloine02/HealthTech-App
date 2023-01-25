const mongoose = require('mongoose');


const boissonSchema = new mongoose.Schema({
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
    
    
    volume:{
        type: String,
        required: true,
       
        
        
    },
    type:{
        type: String,
        required: true,
       
        
        
    },
    calendrierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Calendrier',
       
        
    },
  
    
    
});



module.exports = mongoose.model("boisson",boissonSchema);