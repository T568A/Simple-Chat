var express = require('express'),
    app = express(),
    server = require('http').Server(app);
    io = require('socket.io')(server);

app.disable('x-powered-by');
app.use(express.static('public'));

server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
