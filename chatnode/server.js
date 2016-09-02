var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var router = express.Router();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io").listen(server);

var chat = [];
var bot = [];

// Declarations des middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

// Gestion des routes de l'application
router.get('/', function(req, res) {
    res.render('index.ejs');
});

router.get("/chat", function(req, res){
	res.send(chat);
});

app.use(router);
server.listen(1337);

io.on("connection", function(socket){
	console.log("connexion nouvel utilisateur");
	socket.on("messages", function(data){
		socket.broadcast.emit("updateMsg", data);
		chat.push(data);
		console.log(chat);
	});
});


//app.listen(1337);
