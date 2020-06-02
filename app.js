const express = require('express');
const path = require('path');

const app = express();

const server = require('http').Server(app);
const io  = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('io', io);


app.use('/', (req, res) => {
    res.render('index.html');
})

server.listen(3000);



let messagens  = [];

io.on('connection', (socket) => { 
    console.log(`Socket connectado: ${socket.id}`);

    socket.emit('historicMessage', messagens);

    socket.on('sendMensage',  data => {
        messagens.push(data);
        socket.broadcast.emit('message', data);
    });

    
})


