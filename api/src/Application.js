var config = require("./config");
var mongoose = require("mongoose");
var Server = require("./Utilities/Server");
var ClubController = require("./Controllers/ClubController");
var ClubModel = require("./Model/Club");

var app = {	
	config: config
};

app.server = new Server(app);

mongoose.connect(app.config.db.url);
app.db = mongoose.connection;

app.controllers = {
	Clubs : new ClubController(app, "/api/clubs/")
};

app.model = {
	Clubs :  new ClubModel(app)
};

app.server.start();