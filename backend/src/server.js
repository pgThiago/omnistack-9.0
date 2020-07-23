const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io'); // aula 5
const http = require('http');          // aula 5

const app = express();
const server = http.Server(app); // aula 5
const io = socketio(server);     // aula 5


mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-00qfm.mongodb.net/omnistack9', {useNewUrlParser: true, useUnifiedTopology: true});


const connectedUsers = {};

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    
    return next();
    
})


// GET, POST PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)
app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);

server.listen(3333); // aula 5 app virou server