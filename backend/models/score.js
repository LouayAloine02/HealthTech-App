const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');

const scoreSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },

    createdAt: {
        type: Date,

        default: Date.now()

    }





});

scoreSchema.methods.compareDate = async function () {
    const now = moment().format('L');
    if (now == moment(this.date).format('L')) return True

}



module.exports = mongoose.model("score", scoreSchema);