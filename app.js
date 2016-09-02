var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var router = express.Router("router");

app.use(bodyParser.urlencoded({					//à placer en début de fichier
    extended: true
}));

app.use(express.static(__dirname + "/public"));

app.all("/login", function(req, res){
	fs.readFile("login.html", function(err, data){
		if(err){
			res.end("Erreur");
		}
		res.end(data);
	});
});

// router.get(["/", "/login"], function(req, res){
// 	fs.readFile("login.html", function(err, data){
// 		if(err){
// 			res.end("Erreur");
// 		}
// 		res.end(data);
// 	});
// });

router.get(["/", "/index"], function(req, res){
	res.render("animal.ejs", {animal: ["chat", "chien", "souris"]});
});

app.use(router);

app.get("/index", function(req, res){
	fs.readFile("animal.ejs", function(err, data){
		if(err){
			res.end("Erreur");
		} res.end(data);
	});
});

app.get("/hello", function(req, res){
	res.end("<h1>Hello mon ami<h1/>");
});

app.get("/hello/:firstname", function(req, res){
	res.end("Bonjour " + req.params.firstname);
});


app.post("/login", function(req, res){
	if(req.body.password =="password"){
		res.redirect("/admin");
	}else{
		res.redirect("/AuthError");
	}
});

app.get("/AuthError", function(req, res){
	fs.readFile("AuthentificationError.html", function(err, data){
		if(err){
			res.end("Erreur");
		}
		res.redirect("/login");
		//res.end(data);
	});
});

app.get("/admin", function(req, res){
	fs.readFile("admin.html", function(err, data){
		if(err){
			res.end("Erreur");
		}
		res.end(data);
	});
});




app.listen(1337, function(){
	console.log("Serveur Anne-Isabelle");
});