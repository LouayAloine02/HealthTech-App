const mongoose = require('mongoose');

const ChatModel = mongoose.Schema(
    {

        sender:
        {
            type: mongoose.Schema.Types.ObjectId,

        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,

        },
        text: {
            type: String,

            //  required:true
        },
        lastmessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chat"
        }
    },
    {
        timestamps: true
    }
);
const Chat = mongoose.model("chat", ChatModel);
module.exports = Chat;