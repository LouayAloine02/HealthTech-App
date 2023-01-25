const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');

const questionnaireSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },


});


questionnaireSchema.pre('save', function (next) {
    next()
  
    
})

module.exports = mongoose.model("questionnaire", questionnaireSchema);