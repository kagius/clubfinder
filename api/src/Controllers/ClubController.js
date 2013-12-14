module.exports = function(app, baseUrl) {

	var self = this;

	self.app = app;
	self.baseUrl = baseUrl;

	self.handlers = {
		/**
		 * Returns a summary of all clubs which are in the system and are approved for display.
		 * Accepts the following parameters:
		 * :page - The page number for paginated data.
		 * :format - The expected format (html or json).
		 */
		fetch: {
			method: "get",
			route: "all/:page/showing/:pageSize",
			version: "1.0.0",
			implementation: function(req, callback) {
				return self.app.model.Clubs.fetch(req.params.pageSize, req.params.page, callback);
			},
			htmlTemplate: "club-list"
		},

		/**
		 * Returns a summary of all clubs in a given country or city.
		 * Accepts the following parameters:
		 * :country - The requested country.
		 * :city - The requested city (optional)
		 * :format - The expected format (html or json).
		 */
		byLocation: {
			method: "get",
			route: "loc/:country/:city",
			version: "1.0.0",
			implementation: function(req, callback) {
				return self.app.model.Clubs.byLocation(req.params.country, req.params.city, callback);
			},
			htmlTemplate: "club-list"
		},

		/**
		 * Returns a summary of all clubs matching a given name or starting with the given name.
		 * Accepts the following parameters:
		 * :name - A name or name fragment.
		 * :format - The expected format (html or json).
		 */
		byName: {
			method: "get",
			route: "name/:name",
			version: "1.0.0",
			implementation: function(req, callback) {
				return self.app.model.Clubs.byName(req.params.name, callback);
			},
			htmlTemplate: "club-list"
		},

		/**
		 * Returns the details of a single club matching the url slug.
		 * :slug - The unique slug for the club.
		 * :format - The expected format (html or json).
		 */
		bySlug: {
			method: "get",
			route: "detail/:slug",
			version: "1.0.0",
			implementation: function(req, callback) {
				return self.app.model.Clubs.bySlug(req.params.slug, callback);
			},
			htmlTemplate: "club-detail"
		},
	};

	self.app.server.registerHandlers(baseUrl, self.handlers);
};