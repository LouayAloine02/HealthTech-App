const express = require('express');
const mongoose = require('mongoose');
const Admin = require("./models/Admin");
const cors = require('cors')
const app = express();
const http = require("http")
require('dotenv/config');
const api = process.env.API_URL;
const adminRoutes = require('./routes/adminRoutes')
const hopitalRoutes = require('./routes/hopitalRoutes')
const userRoutes = require('./routes/userRoutes')
const patientRoutes = require('./routes/patient')
const patienthopital = require("./routes/patientHopital")
const medecinhopital = require("./routes/medecinHopital")
const patientmedecin = require("./routes/medecinpatient")
const medecinRouter = require('./routes/medecinRoutes');
const io = require('socket.io')();

const chatRouter = require('./routes/chatRoutes')

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/medecin", medecinRouter);
app.use("/api/admin", adminRoutes)
app.use("/api/hopital", hopitalRoutes)
app.use("/api/user", userRoutes)
app.use("/api/patient", patientRoutes)
app.use("/api/patientH", patienthopital)
app.use("/api/medecinH", medecinhopital)
app.use("/api/patientmedecin", patientmedecin)
app.use("/api/chat", chatRouter)









mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex : true

}
).then(() => {
    console.log('Database connection is ready ...')
})
    .catch((err) => {
        console.log(err);
    })

mongoose.connection.on('connected', () => {
    console.log("connected to mongo ")
})
mongoose.connection.on('error', (err) => {
    console.log("this is error  ", err)
})


const server = http.createServer(app)
//init our socket


server.listen(5000, () => {
    console.log("le serveur est en marche");
});
//donner un port et ajouter un callback 


io.on('connection', socket => {
    console.log(`connect: ${socket.id}`);
  
    socket.on('disconnect', () => {
      console.log(`disconnect: ${socket.id}`);
    });
  });

//middleware
// require("./middlewares/socket")(io)

io.on("connection",(socket)=>{
    console.log("user connecté" + socket.id)
    socket.on("disconnect", ()=> {
        console.log("user déconnecté " , socket.id)
    })
})















// const io = socket(server, {
//     cors: {
//         origin: "http://192.168.0.139:5000",
//         credentials: true,
//     },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//     global.chatSocket = socket;
//     socket.on("add-user", (userId) => {
//         onlineUsers.set(userId, socket.id);
//     });

//     socket.on("send-msg", (data) => {
//         const sendUserSocket = onlineUsers.get(data.to);
//         if (sendUserSocket) {
//             socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//         }
//     });
// });