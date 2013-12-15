var Club = require("./Schema/Club");

module.exports = function(app) {

	var self = this;
	this.app = app;

	this.fetch = function(pageSize, page, callback) {

		var data = {};

		Club
			.where("approved.status").equals(true)
			.count(function(err, count) {
				data.count = count;
			
				Club
					.where("approved.status").equals(true)
					.sort("name -added.on")
					.skip(pageSize * (page -1))
					.limit(pageSize)
					.exec(function(err, result) {
						data.result = result;
						callback(null, data);
					});			
		});
	};

	this.byLocation = function(country, city, callback) {

		var data = {
			result: []
		};		

		self.byCity(city, function(err, result) {
			data.result = data.result.concat(result);
			self.byCountry(country, city, function(err, result) {
				data.result = data.result.concat(result);
				callback(null, data);
			});
		});
	};

	this.byCity = function(city, callback) {		
		Club
			.where("approved.status").equals(true)
			.where("address.city").equals(city)
			.sort("name -added.on")
			.exec(callback);
	};

	this.byCountry = function(country, city, callback) {
		var query = Club
			.where("approved.status").equals(true)
			.where("address.country").equals(country)
			.where("address.city").ne(city)
			.sort("name -added.on").exec(callback);
	};
}
