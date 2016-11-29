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
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});


app.use(function(req, res, next) {
  res.status(404).send('<h1>404 :C</h1>');
});
