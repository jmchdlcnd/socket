var express = require('express');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(1024);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

var ns1 = io.of('/ns1');
//var ns2 = io.of('/ns2');

ns1.on('connection', function (socket) {
	//ns1.emit('news', { hello: 'soy el 1' });

	socket.emit('news', {hello: 'Ti id es: ' + socket.id});

	/*socket.on('trip', function (name) {
		console.log(name);
	});*/
});