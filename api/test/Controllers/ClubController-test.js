var ClubController = require("../../src/Controllers/ClubController");
var MockApplication = require("../MockApplication");

exports.testClubControllerFetch = function(test){

	var expectedPageNumber = 1;
	var expectedPageSize = 10;

	var actualPageNumber = 0;
	var actualPageSize = 0;

	var app = new MockApplication();
	app.model.Clubs = {
		fetch: function(pageSize, pageNumber) {
			actualPageNumber = pageNumber;
			actualPageSize = pageSize;
		}
	};
		
	var controller = new ClubController(app, "/test/");
	controller.handlers.fetch.implementation({ params: { page: expectedPageNumber, pageSize: expectedPageSize } });

	test.equal(actualPageSize, expectedPageSize, "The controller should always pass the exact page size to the model.");
	test.equal(actualPageNumber, expectedPageNumber, "The controller should pass the exact page number to the model.");    
	test.done();
};

exports.testClubControllerByLocation = function(test){

	var expectedCountry = "malta";
	var expectedCity = "floriana";

	var actualCountry = "";
	var actualCity = "";

	var app = new MockApplication();
	app.model.Clubs = {
		byLocation: function(country, city) {
			actualCountry = country;
			actualCity = city;
		}
	};
	
	var controller = new ClubController(app, "/test/");
	controller.handlers.byLocation.implementation({ params: { country: "Malta", city: "Floriana" } });

	test.equal(actualCity, expectedCity, "The controller should always pass the lower-case city name to the model.");
	test.equal(actualCountry, expectedCountry, "The controller should pass the lower-case country name to the model.");    
	test.done();
};

exports.testClubControllerByLocationShouldPassIdenticalParametersIfOnlyOneIsGiven = function(test){

	var expectedCountry = "malta";
	var expectedCity = "malta";

	var actualCountry = "";
	var actualCity = "";

	var app = new MockApplication();
	app.model.Clubs = {
		byLocation: function(country, city) {
			actualCountry = country;
			actualCity = city;
		}
	};
	
	var controller = new ClubController(app, "/test/");
	controller.handlers.byLocation.implementation({ params: { country: "Malta" } });

	test.equal(actualCity, expectedCity, "The controller should always pass the lower-case city name to the model.");
	test.equal(actualCountry, expectedCountry, "The controller should pass the lower-case country name to the model.");    
	test.done();
};

exports.testClubControllerByName = function(test){

	var expectedName = "mh";
	var actualName = "";

	var app = new MockApplication();
	app.model.Clubs = {
		byName: function(name) {
			actualName = name;
		}
	};
	
	var controller = new ClubController(app, "/test/");
	controller.handlers.byName.implementation({ params: { name: expectedName } });

	test.equal(actualName, expectedName, "The controller should always pass the exact name to the model.");
	test.done();
};

exports.testClubControllerBySlug = function(test){

	var expectedSlug = "mhfa";
	var actualSlug = "";

	var app = new MockApplication();
	app.model.Clubs = {
		bySlug: function(slug) {
			actualSlug = slug;
		}
	};
	
	var controller = new ClubController(app, "/test/");
	controller.handlers.bySlug.implementation({ params: { slug: expectedSlug } });

	test.equal(actualSlug, expectedSlug, "The controller should always pass the exact name to the model.");
	test.done();
};