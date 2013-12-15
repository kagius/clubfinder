var restify = require("restify");

module.exports = function(app) {
		
	var self = this;
	self.app = app;
	self.server = restify.createServer();

	this.start = function() {

		var port = self.app.config.port;
		self.server.listen(port, function() {
			if (self.app.config.logging.info) 
				console.log("Listening on port " + port);
		});
	};

	this.setRoute = function(method, route, callback)  {
		self.server[method](route, callback);
	};

	this.answer = function(req, res, next, data, template) {

		var format = (req.params.format) ? req.params.format : "json";

		if (self.app.config.logging.trace)
			console.log ("Preparing response in format: " + req.params.format);
		
		if (self.app.config.headers.accessControlAllowOrigins)
			res.setHeader('Access-Control-Allow-Origin', self.app.config.headers.accessControlAllowOrigins);
		
		res.setHeader('content-type', 'application/json');
		res.send(data);
	}

	this.generateHandler = function(name, handler) {

		return function(req, res, next) {

			if (self.app.config.logging.trace) {
				console.log ("Routing request to " + name);
				console.log (req.params);
			}

			handler.implementation(req, function(err, data) {
				self.answer(req, res, next, data, handler.htmlTemplate);
			});
		};
	}

	this.registerHandlers = function(baseUrl, handlers) {
		for (var name in handlers) {
			
			var handler = handlers[name];
			var handlerWrapper = self.generateHandler(name, handler);
			
			for (var i in handler.routes) {

				if (self.app.config.logging.trace) {
					console.log ("Registering " + handler.method + " handler " + name + " for route '" + baseUrl +  handler.routes[i] + "' v" + handler.version);
					console.log ("Registering " + handler.method + " handler " + name + " for route '" + baseUrl +  handler.routes[i] + "/:format" + "' v" + handler.version);
				}
							
				self.setRoute(handler.method, { path: baseUrl + handler.routes[i], version: handler.version }, handlerWrapper);
				self.setRoute(handler.method, { path: baseUrl + handler.routes[i] + "/:format", version: handler.version }, handlerWrapper);
			}
		}
	};
};