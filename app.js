var express = require('express');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(1024);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
})

var ns1 = io.of('/ns1');
var ns2 = io.of('/ns2');

ns1.on('connection', function (socket) {
	//ns1.emit('news', { hello: 'soy el 1' });

	io.emit('news', {hello: 'conexion en el 1'});

	socket.on('my other event', function (data) {
		console.log(data);
	});
});

ns2.on('connection', function (socket) {
	ns2.emit('news', { hello: 'soy el 2' });

	socket.on('my other event', function (data) {
		console.log(data);
	});
});