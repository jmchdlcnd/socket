var underscore = require('underscore');

var sockets = {};

module.exports = function (io){
	this.name = "Rick";
	this.io = io;

	this.getSocket = function (id){
		//console.log(this.io.sockets.sockets);
		for(i in this.io.sockets.sockets){
		
			if(io.sockets.sockets[i].id === id){
				console.log("Encontre el socket");
				io.sockets.sockets[i].emit('trip/curso');
				break;
			}
		}
	}

	this.addSocket = function (data){
		sockets[data.customId] = data.socket;
		//console.log(sockets);
	}

	this.join = function (data){
		for(i in data.sockets){
			sockets[data.sockets[i]].join(data.room);
			//console.log(sockets[data.sockets[i]].adapter.rooms);
		}
	}

	this.deleteSocket = function (data){
		for(i in sockets){
			if(sockets[i].id === data.socketId)
				delete sockets[i];	
		}

		console.log(underscore.size(sockets));
	}

	return this;
}