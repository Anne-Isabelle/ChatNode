//création des modules HTTP et File System
var http = require("http");
var fs = require("fs");
var url = require("url");

//création d'un serveur sur le module http
var server = http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type": "text/html"});			//writeHead prend 2 paramètres: le premier est le status code
	res.write("<h1>Salut tout le monde</h1>");					//res.write n'est pas la meilleure solution si on a bcp d'info HTML
	fs.readFile("index.html",function(err, data){				//fs.readFile permet d'accéder à un fichier HTML. C'est plus propre
		if(err){
			res.end("Une erreur est survenue");
		}else{
				var detailUrl = url.parse(req.url, true);
				if(detailUrl.pathname == "/"){
					res.end(data);
				}else if(detailUrl.pathname == "/hello"){
					res.end(data + "</br><h2>Hello mon ami</h2>");
				}
				else{
					res.end("<h2>Erreur!!!!</h2>");
				}
			}
		res.end(data);											//indique la fin de la réponse, ça doit être la dernière instruction
	});


});

// le serveur écoute le serveur 1337 et exécute le console.log quand quelqu'un s'y connecte 
server.listen(1337, function(){
	console.log("Serveur Anne-Isabelle");
});