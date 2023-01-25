const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');

const quizSchema = new mongoose.Schema({
    patientId: {
        ref:'patienth',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    IdQuest1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questionnaire',
        // required: true
    },
    IdQuest2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questionnaire',
        // required: true
    },
    IdQuest3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questionnaire',
        // required: true
    },

    jourd: {
        type: String,

        required: true,

    },
    moisd: {
        type: String,

        required: true,

    },
    anneed: {
        type: String,

        required: true,
    },
    createdAt: {
        type: Date,

        default: Date.now()

    }







});
quizSchema.pre('save', function (next) {
    next()
  
    
})




module.exports = mongoose.model("quiz", quizSchema);