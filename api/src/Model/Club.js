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
	}
}