module.exports = function(app) {

	var self = this;
	self.config = {
		logging : {
			trace : false
		},
		db:{
			url: ""
		}
	};

	self.server = {
		registerHandlers: function(a, b) {}
	};

	self.model = {
	};
};