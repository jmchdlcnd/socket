var args = process.argv.splice(2);

var express = require('express');
var underscore = require('underscore');
var app = express();
var sioRedis = require('socket.io-redis');
var redis = require('redis');
var client = redis.createClient();

var ioEmitter = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });

var server = require('http').Server(app);

var io = require('socket.io')(server);
io.adapter(sioRedis({ host: 'localhost', port: 6379 }));

var d = io.of('/dispatch');

server.listen(args[0] || 1024);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/rider', function (req, res) {
  res.sendFile(__dirname + '/rider.html');
});

d.on('connection', function (socket) {
	console.log('Pi: ' + process.pid);
	//console.log(io.sockets.connected);	

	socket.on('driver/register', function (data){ 
		console.log(data);
	  	client.set(data.driverId, socket.id, function (err, result){
	  		if(err) return console.log('Error al almacenar el socketId en Redis');
	  		
	  		console.log('Driver regitrado: ');
	  		console.log(data.driverId);
	  		var customId = '565cee84c05316b50656acf8';
	  		//var customId = 12345;
	  		//socket.broadcast.emit('driver/chance', new Date); //Emitir mensaje a todos sin incluir el socket que desecandeno el evento
	  		client.get(customId, function (err, socketId){
	  			if(err) return console.log('Error al recuperar el socketId en Redis');
	  			
	  			console.log('El socketId recuperado fue: ');
	  			console.log(socketId);

	  			//io.to(socketId).emit('driver/chance', new Date);
	  			ioEmitter.to(socketId).emit('driver/chance', new Date);
	  		});
	  	});
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