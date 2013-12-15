var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost/test", function(err, db) {

	if (err) console.log(err);	

	db.collection("clubs", function(err, collection) {

		// Clear any existing data.
		collection.drop();

		// Add our test data
		collection.insert(
			{ 
				name: "test1", 	
				approved: { status: true, 	on: new Date() },
				address: {	
					building: "St. Publius Hall",
					street: "St. Publius Street",
					city: "floriana",
					country: "malta",
				},

			}, function(err, result) {});
		collection.insert(
			{ 
				name: "Home", 	
				approved: { status: true, 	on: new Date() },
				address: {	
					building: "whatever",
					street: "whatever",
					city: "mosta",
					country: "malta",
				},

			}, function(err, result) {});
		collection.insert({ name: "test3", 	approved: { status: false, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test4", 	approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test5", 	approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test6", 	approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test7", 	approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test8", 	approved: { status: false, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test9", 	approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test10", approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test11", approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test12", approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test13", approved: { status: false, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test14", approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test15", approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test16", approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test17", approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test18", approved: { status: false, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test19", approved: { status: true, 	on: new Date() } }, function(err, result) {});
		collection.insert({ name: "test20", approved: { status: true, 	on: new Date() } }, function(err, result) {});

		db.close();		
	});
});