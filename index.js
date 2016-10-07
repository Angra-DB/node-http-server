var http = require ('http');
var dispatcher = require('httpdispatcher');
var net = require('net');
var PORT = 3000;



dispatcher.onGet("/teste", function(req, res) {

    var client = net.createConnection({port: 1234}, function() {
      console.log("conectou!");
      client.write("save erlang");
    });

    var resData;
    client.on('data', function(data) {
      console.log("chegou data: " + data);
      client.destroy();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(data);
    });

    client.on('close', function() {
	     console.log('Connection closed');
    });
});

function handleRequest(request, response) {
  try {
        //log the request on console
        console.log(request.url);
        //Dispatch
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
  console.log("Server listening on: http://localhost: " + PORT);

})
