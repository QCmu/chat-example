var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sum = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    sum += parseFloat(msg);
    io.emit('sum message', sum.toString());
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
