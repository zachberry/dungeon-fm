//https://docs.mongodb.com/getting-started/node/update/

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var assert = require('assert');
var ObjectId = MongoDB.ObjectID;

var url = 'mongodb://localhost:27017/test';

// var updateRestaurants = function(db, callback) {
// 	db.collection('restaurants').updateOne(
// 		{ 'name':'juni' },
// 		{
// 			$set: { 'cusine':'American (New)' },
// 			$currentDate: { 'lastModified':true }
// 		}, function(err, results) {
// 			assert.equal(null, err);

// 			console.log(results);
// 			callback();
// 		}
// 	);
// };

var updateRestaurants = function(db, callback) {
	db.collection('restaurants').updateOne(
		{ 'address.street':'2 Avenue' },
		{
			$set: { 'address.street':'3 Avenue' },
			// $currentDate: { 'lastModified':true }
		}, function(err, results) {
			assert.equal(null, err);

			console.log(results.result);
			callback();
		}
	);
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected to server.');

	updateRestaurants(db, function() {
		db.close();
	})
});