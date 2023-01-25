const Chat = require("../models/chatModel");
exports.accessChat = async (req, res) => {
    console.log("hello")
    const user1Id = req.params.id
    const result = req.body;
    
    console.log(result)
    if (!user1Id) {
        console.log("userId param not sent with request");
        return res.sendStatus(400);

    }
    const lastmessage = await Chat.findOne({ sender: user1Id, receiver: result.user2 })
        .sort({ createdAt: -1 }).limit(1)
    console.log(lastmessage)
    if (lastmessage) {
        const chat1 = new Chat({
            sender: user1Id,
            receiver: result.user2,
            text: result.content,
            lastmessage: lastmessage._id
        })
        await chat1.save()
        res.json({
            success: true
            , chat: chat1
        })

    } else {
      const   chat1 = new Chat({
            sender: user1Id,
            receiver: result.user2,
            text: result.content,
        })
        await chat1.save()
        res.json({
            success: true
            , chat: chat1
        })

    }




   

};

exports.getchat = async (req, res) => {
    console.log("moi")
    const user1Id = req.params.id
    if (!user1Id) {
        console.log("userId param not sent with request");
        return res.sendStatus(400);

    }
    console.log(user1Id)
    const lastmessage = await Chat.find({ sender: user1Id })
        .sort({ createdAt: -1 })
    res.send(lastmessage)



};