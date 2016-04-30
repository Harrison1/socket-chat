var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	users = {};
	
server.listen(3000, function(){
  console.log('listening on port:3000');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));
app.use(express.static('js'));


io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, color, callback){
		if (data in users){
			callback(false);
		} else {
			callback(true);
			socket.nickname = data;
			socket.color = color;
			users[socket.nickname] = socket;
			updateNicknames();
		}
	});
	
	function updateNicknames(){
		io.sockets.emit('usernames', Object.keys(users));
	}

	socket.on('send message', function(data, callback) {
		var msg = data.trim();
		if (data.substr(0,3) === '/w ') {
			msg = msg.substr(3);
			var ind = msg.indexOf(' ');
			if (ind !== -1) {
				var name = msg.substr(0, ind);
				var msg = msg.substr(ind + 1);
				if(name in users) {
					users[name].emit('whisper', {msg: msg, nick: socket.nickname, color: socket.color })
					console.log('whisper');
				} else {
					callback('Error! enter a valid user');
				}
			} else {
				callback('Error! please enter message for private chat');
			}
		} else {
			io.sockets.emit('new message', {msg: msg, nick: socket.nickname, color: socket.color });
		}
	});
	
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		delete users[socket.nickname];
		updateNicknames();
	});
});
