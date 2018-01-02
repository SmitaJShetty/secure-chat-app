
var app=require('express')();
var http=require('http').Server(app);
var io = require('socket.io')(http);
var fs= require('fs');

app.get('/',function(req,resp){
  fs.readFile('../html/index.html','utf-8',function(err,contents){
    if(err==null){
    resp.setHeader('Content-Type','text/html');
    resp.writeHead(resp.statusCode);
    resp.write(contents);
    resp.end();
  }
  });
  console.log('request for html file came');
});

io.on('connection',function(socket){
  socket.on('chatmessage',function(mesg){
    console.log(mesg);
    socket.emit('clientcall',{servermsg:'hello from server'});
  });
});

http.listen(3000,function(){
console.log('listening on *:3000');
});
