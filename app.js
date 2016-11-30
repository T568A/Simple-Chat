var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    escape = require('escape-html');

app.disable('x-powered-by');
app.use(express.static('public'));

server.listen(80);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //TODO: add event new client
    socket.on('chat message', function(msg){
        if (msg.messageText.trim() !== '') {
            msg.messageText = escape(msg.messageText.trim());
            io.emit('chat message', msg);
            console.log(msg.userName + ': ' + msg.messageText);
        }
    });
});

app.use(function(req, res, next) {
    res.status(404).send('<h1>404 :C</h1>');
});
