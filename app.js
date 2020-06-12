const express = require('express');
const path = require('path');

const app = express();

const server = require('http').Server(app);
const io  = require('socket.io')(server);

const PORT = 3000;
const HOST = "0.0.0.0";


app.use(express.static(path.join(__dirname, '/src/views')));
app.set('views', path.join(__dirname, '/src/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('io', io);


app.use('/', (req, res) => {
    res.render('index.html');
})

server.listen(PORT, HOST);



let messagens  = [];

io.on('connection', (socket) => { 
    // envia historico de mensagem
    socket.emit('historicMessage', messagens);

    // espera a messagem enviada peleos usuários
    socket.on('sendMensage',  data => {
        messagens.push(data);
        //envia a mensagem de um usuários a todos logados
        socket.broadcast.emit('message', data);
    });

    
})


