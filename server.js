
// Setup ========================
  var express  = require('express');
  var app      = express();                         // Cria a aplicação com o express
  var morgan = require('morgan');                   // Realiza o log de requisições no console
  var bodyParser = require('body-parser');          // Obter informação de um POST
  var methodOverride = require('method-override');  // Simula o DELETE e PUT

  var http = require ('http');
  var dispatcher = require('httpdispatcher');
  var net = require('net');
  var PORT = 3000;
  var url = require('url');

// Configuration =================
  app.use(express.static(__dirname + '/public'));                 // Adiciona a localização dos arquivos estáticos.
  app.use(morgan('dev'));                                         // Escreve toda requisição no console
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parser url
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json
  app.use(methodOverride());

  
  app.listen(8080);
  console.log("Aplicação escutando na porta 8080");

  app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });


  app.get("/save", function(req, res) {

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

  app.get("/lookup?id=1", function(req, res) {

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

  app.get("/delete?id=1", function(req, res) {

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

  app.get("/update", function(req, res) {

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

  // function handleRequest(request, response) {
  //   try {
  //         //log the request on console
  //         console.log(request.url);
  //         //Dispatch
  //         dispatcher.dispatch(request, response);
  //     } catch(err) {
  //         console.log(err);
  //     }
  // }

  // var server = http.createServer(handleRequest);

  // server.listen(PORT, function() {
  //   console.log("Server listening on: http://localhost: " + PORT);
  // })
