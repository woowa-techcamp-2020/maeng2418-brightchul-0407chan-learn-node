var net = require('net'),
    sockets = [];

var server = net.createServer(function(client){
    client.setEncoding('utf-8');
    client.setTimeout(500);
    client.on('data',function(data){
        for( var i =0; i<sockets.length; i++){
            sockets[i].write(data);
        }
    });
    client.on('error', function(){

    });
    client.on('close', function(){
        sockets.pop();
        console.log('socket closed!');
    });
    client.on('timeout', function(){});
    client.write('welcome');
    sockets.push(client);
});

server.on('error',function(error){

});

server.listen(2222,function(){
    var serverInfo = server.address();
    var serverInfoJson = JSON.stringify(serverInfo);
    console.log('listen server : ' + serverInfoJson);
    server.on('close', function () {
        console.log('server closed.');
    });
    server.on('connection', function () {
        console.log(`누가 들어왔다!`);
    });
});