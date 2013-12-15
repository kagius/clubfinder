/*
 * Sample application configuration file.
 * To set up the configuration, rename this file to config.js and change the settings as needed.
 */ 
module.exports = {

	// HTTP Listener port
	port: 8080,

	headers: {
		// Ajax cross-domain whitelists
		accessControlAllowOrigins: "http://127.0.0.1:9000"
	},

	// Logging levels
	logging: {
		trace: true,
		debug: true,
		info: true
	},

	// Database connection details
	db:{
		url: "mongodb://localhost/test"
	}
};