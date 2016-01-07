var args = process.argv.splice(2);

var express = require('express');
var underscore = require('underscore');
var app = express();
//var redis = require('socket.io-redis');


var server = require('http').Server(app);

var io = require('socket.io')(server);
//io.adapter(redis({ host: 'localhost', port: 6379 }));

var d = io.of('/dispatch');

server.listen(args[0] || 1024);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

d.on('connection', function (socket) {
	console.log('Pi: ' + process.pid);
	console.log(io.engine);	

	socket.on('driver/register', function (){ 
		console.log("Register");
	  	//socket.emit('driver/chance', new Date);
	  	socket.broadcast.emit('driver/chance', new Date);
	});

	socket.on('disconnect', function (){ 
		console.log(socket.id + " desconectado");
		console.log(underscore.size(io.nsps['/dispatch'].sockets));	
	});
});

/*socket.on('message', function (data) {
    //considering data.room is the correct room name you want to send message to 
    io.sockets.in(data.room).emit('recieve', data.message) //will send event to everybody in the room while 
    socket.broadcast.to(data.room).emit('recieve', data.message) //will broadcast to all sockets in the given room, except to the socket which called it
    // Also socket.broadcast.emit will send to every connected socket except to socket which called it 
});*/