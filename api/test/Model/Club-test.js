var ClubModel = require("../../src/Model/Club");
var mongoose = require("mongoose");
var MockApplication = require("../MockApplication");
var MongoClient = require('mongodb').MongoClient;

function callback(err) {
	if (err)
		console.log(err);
}

/**
 * Test for club.Fetch
 * The fetch function should only display clubs which have been approved.
 */
exports.clubFetchShouldOnlyReturnApprovedItems = function(test){

	var app = new MockApplication();
	app.config.db.url = "mongodb://localhost:27017/clubModelTest";

	mongoose.connect(app.config.db.url);
	app.db = mongoose.connection;

	MongoClient.connect(app.config.db.url, function(err, db) {

		if (err) console.log(err);

		test.expect(3);

		db.collection("clubs", function(err, collection) {

			// Clear any residual data from other tests.
			collection.drop();

			// Add our test data
			collection.insert({ name: "test2", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test4", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test3", approved: { status: false, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test1", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });					

			var model = new ClubModel(app);
			model.fetch(10, 1, function(err, data) {
					
				// Clean up after our test.
				collection.drop();
				db.close();
				app.db.close();

				test.equal(data.result.length, 3, "Only records with status:true should be returned.");
					
				test.ok(
					(data.result[0].name == "test1" &&
					 data.result[1].name == "test2" &&
					 data.result[2].name == "test4"),
					"Results should be sorted by name");

				test.equal(data.count, 3, "Fetch should always return a count of all the available records.");
					
				test.done();
			});
		});
	});
}

/**
 * Test for club.Fetch
 * The fetch function should never return more items than the requested page size.
 */
exports.clubFetchShouldReturnUpToPageSizeItems = function(test){
	var app = new MockApplication();
	app.config.db.url = "mongodb://localhost:27017/clubModelTest";

	mongoose.connect(app.config.db.url);
	app.db = mongoose.connection;

	MongoClient.connect(app.config.db.url, function(err, db) {

		if (err) console.log(err);

		test.expect(2);

		db.collection("clubs", function(err, collection) {			

			// Clear any residual data from other tests.
			collection.drop();

			// Add our test data
			collection.insert({ name: "test1", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test2", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test3", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test4", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test5", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test6", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test7", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test8", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test9", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });

			var model = new ClubModel(app);

			var pageSize = 5;
			var page = 1;

			model.fetch(pageSize, page, function(err, data) {
					
				// Clean up the test collection.
				collection.drop();
				db.close();
				app.db.close();

				test.equal(data.result.length, pageSize, "fetch should never return more items than the specified page size.");			
				test.equal(data.count, 9, "Fetch should always return a count of all the available records.");

				test.done();
			});
		});
	});
}

/**
 * Test for club.Fetch
 * The fetch function should only display items in the current page.
 */
exports.clubFetchShouldSkipWhenPaging = function(test){
	var app = new MockApplication();
	app.config.db.url = "mongodb://localhost:27017/clubModelTest";

	mongoose.connect(app.config.db.url);
	app.db = mongoose.connection;

	MongoClient.connect(app.config.db.url, function(err, db) {

		if (err) console.log(err);

		test.expect(3);

		db.collection("clubs", function(err, collection) {			

			// Clear any residual data from other tests.
			collection.drop();

			// Add our test data
			collection.insert({ name: "test1", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test2", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test3", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test4", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test5", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test6", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test7", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test8", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });
			collection.insert({ name: "test9", approved: { status: true, on: new Date() } }, function(err, result) { callback(err); });

			var model = new ClubModel(app);

			var pageSize = 5;
			var page = 2;

			model.fetch(pageSize, page, function(err, data) {
					
				// Clean up the test collection.
				collection.drop();
				db.close();
				app.db.close();

				test.equal(data.result[0].name, "test6", "When paging, fetch should skip all the records preceding the requested page.");
				test.equal(data.result.length, 4, "If a page cannot be filled, fetch should return the remaining items.");
				test.equal(data.count, 9, "Fetch should always return a count of all the available records.");
			
				test.done();
			});
		});
	});
}

exports.clubShouldReturnResultsByLocation = function(test) {
	var app = new MockApplication();
	app.config.db.url = "mongodb://localhost:27017/clubModelTest";

	mongoose.connect(app.config.db.url);
	app.db = mongoose.connection;

	MongoClient.connect(app.config.db.url, function(err, db) {

		if (err) console.log(err);

		test.expect(3);

		db.collection("clubs", function(err, collection) {			

			// Clear any residual data from other tests.
			collection.drop();

			// Add our test data
			collection.insert({ name: "test1", approved: { status: true, on: new Date() }, address: { city: "floriana", country: "malta" } }, function(err, result) { callback(err); });
			collection.insert({ name: "test2", approved: { status: true, on: new Date() }, address: { city: "mosta", country: "malta" } }, function(err, result) { callback(err); });		
			collection.insert({ name: "test3", approved: { status: true, on: new Date() }, address: { city: "edinburgh", country: "scotland" } }, function(err, result) { callback(err); });
			collection.insert({ name: "test4", approved: { status: false, on: new Date() }, address: { city: "mosta", country: "malta" } }, function(err, result) { callback(err); });
			collection.insert({ name: "test5", approved: { status: false, on: new Date() }, address: { city: "floriana", country: "malta" } }, function(err, result) { callback(err); });

			var model = new ClubModel(app);

			var city = "mosta";
			var country = "malta";

			model.byLocation(country, city, function(err, data) {
					
				// Clean up the test collection.
				collection.drop();
				db.close();
				app.db.close();

				test.equal(data.result.length, 2, "When requesting clubs in a location, both city and country matches should be considered.");
				test.equal(data.result[0].name, "test2", "Clubs exactly matching the city should be returned first.");
				test.equal(data.result[1].name, "test1", "Clubs matching the country should be returned later.");
			
				test.done();
			});
		});
	});
}

exports.clubShouldReturnResultsByCountryIfNoCityPresent = function(test) {
	var app = new MockApplication();
	app.config.db.url = "mongodb://localhost:27017/clubModelTest";

	mongoose.connect(app.config.db.url);
	app.db = mongoose.connection;

	MongoClient.connect(app.config.db.url, function(err, db) {

		if (err) console.log(err);

		test.expect(3);

		db.collection("clubs", function(err, collection) {			

			// Clear any residual data from other tests.
			collection.drop();

			// Add our test data
			collection.insert({ name: "test1", approved: { status: true, on: new Date() }, address: { city: "floriana", country: "malta" } }, function(err, result) { callback(err); });
			collection.insert({ name: "test2", approved: { status: true, on: new Date() }, address: { city: "mosta", country: "malta" } }, function(err, result) { callback(err); });		
			collection.insert({ name: "test3", approved: { status: true, on: new Date() }, address: { city: "edinburgh", country: "scotland" } }, function(err, result) { callback(err); });
			collection.insert({ name: "test4", approved: { status: false, on: new Date() }, address: { city: "mosta", country: "malta" } }, function(err, result) { callback(err); });
			collection.insert({ name: "test5", approved: { status: false, on: new Date() }, address: { city: "floriana", country: "malta" } }, function(err, result) { callback(err); });

			var model = new ClubModel(app);

			var city = null;
			var country = "malta";

			model.byLocation(country, city, function(err, data) {
					
				// Clean up the test collection.
				collection.drop();
				db.close();
				app.db.close();

				test.equal(data.result.length, 2, "When requesting clubs in a location, both city and country matches should be considered.");
				test.equal(data.result[0].name, "test1", "Clubs should be ordered by name.");
				test.equal(data.result[1].name, "test2", "Clubs should be ordered by name.");
			
				test.done();
			});
		});
	});
}
