//https://docs.mongodb.com/getting-started/node/query/

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var assert = require('assert');
var ObjectId = MongoDB.ObjectID;

var url = 'mongodb://localhost:27017/test';

var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find();

	cursor.each(function(err, doc) {
		assert.equal(err, null);

		if(doc == null)
		{
			callback();
			return;
		}

		console.dir(doc);
	});
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected to server.');

	findRestaurants(db, function() {
		db.close();
	})
});