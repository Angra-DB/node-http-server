var http = require ('http');
var dispatcher = require('httpdispatcher');
var net = require('net');
var PORT = 3000;
var url = require('url');



dispatcher.onGet("/save", function(req, res) {

    var client = net.createConnection({port: 1234}, function() {
      console.log("conectou! - Executando operação de save");
      client.write("save {Erlang}");
    });

    var resData;
    client.on('data', function(data) {
      console.log("Documento salvo com sucesso , Dados Recebidos: " + data);
      client.destroy();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(data);
    });

    client.on('close', function() {
	     console.log('Connection closed');
    });
});

dispatcher.onGet("/lookup?id=1", function(req, res) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var client = net.createConnection({port: 1234}, function() {
      console.log("conectou! - Executando operação de lookup com id: " + query);
      client.write("lookup " + query);
    });

    var resData;
    client.on('data', function(data) {
      console.log("Documento recuperado com sucesso , Dados Recebidos: " + data);
      client.destroy();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(data);
    });

    client.on('close', function() {
       console.log('Connection closed');
    });
});

dispatcher.onGet("/delete?id=1", function(req, res) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var client = net.createConnection({port: 1234}, function() {
      console.log("conectou! - Executando operação de delete com id: " + query);
      client.write("delete " + query);
    });

    var resData;
    client.on('data', function(data) {
      console.log("Documento deletado com sucesso , Dados Recebidos:  " + data);
      client.destroy();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(data);
    });

    client.on('close', function() {
       console.log('Connection closed');
    });
});

dispatcher.onGet("/update", function(req, res) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var client = net.createConnection({port: 1234}, function() {
      console.log("conectou! - Executando operação de update");
      client.write("update 1 {erlang}");
    });

    var resData;
    client.on('data', function(data) {
      console.log("Documento atualizado com sucesso , Dados Recebidos:  " + data);
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
