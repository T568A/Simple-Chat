var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    escape = require('escape-html'),
    users = [],
    messageHistory = [];

app.disable('x-powered-by');
app.use(express.static('public'));

server.listen(80);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //TODO: add event new client

    socket.on('connect user', function(msg) {
        if (users.indexOf(msg.userName) === -1 && msg.userName.length < 10) {
            users.push(escape(msg.userName.trim()));
            console.log(users);
            socket.emit('logon', 'allow');
            messageHistory.forEach(function(element, index, array) {
                socket.emit('chat message', element);
            });

            io.emit('render userlist', users);
        } else {
            socket.emit('logon', 'deny');
        }

    });
    // TODO: TypeError: Cannot read property 'trim' of undefined (if userName empty)
    socket.on('chat message', function(msg) {
        if (msg.messageText.trim() !== '' && msg.userName.trim() !== '') {
            msg.messageText = escape(msg.messageText.trim());
            msg.userName = escape(msg.userName.trim());
            io.emit('chat message', msg);
            if (messageHistory.length >= 10) {
                messageHistory.shift();
            }
            messageHistory.push(msg);
            console.log(msg.userName + ': ' + msg.messageText);
            console.log(messageHistory);
        }
    });
});

app.use(function(req, res, next) {
    res.status(404).send('<h1>404 :C</h1>');
});
