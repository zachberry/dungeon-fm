//https://docs.mongodb.com/getting-started/node/query/

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var assert = require('assert');
var ObjectId = MongoDB.ObjectID;

var url = 'mongodb://localhost:27017/test';

var insertDocument = function(db, callback) {
	db.collection('restaurants').insertOne({
		'address': {
			'street': '2 Avenue'
		},
		'grades': [
			{
				'date': new Date('2014-10-01T00:00:00Z'),
				'grade': 'A',
				'score': 11
			},
			{
				'date': new Date('2015-10-01T00:00:00Z'),
				'grade': 'B',
				'score': 16
			},
			{
				'date': new Date('2016-10-01T00:00:00Z'),
				'grade': 'B',
				'score': 19
			}
		]
	}, function(err, result) {
		assert.equal(err, null);
		console.log('Inserted a document into the restaurants collection');

		callback();
	});
};

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

var findRestaurantsSpecific = function(db, callback) {
	var cursor = db.collection('restaurants').find({ 'grades.grade':'B' });

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

var findRestaurantsSymbols = function(db, callback) {
	var cursor = db.collection('restaurants').find({ 'grades.score':{ $gt:15 } });

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


// MongoClient.connect(url, function(err, db) {
// 	assert.equal(null, err);
// 	console.log('Connected to server.');

// 	insertDocument(db, function() {
// 		db.close();
// 	})
// });



// MongoClient.connect(url, function(err, db) {
// 	assert.equal(null, err);
// 	console.log('Connected to server.');

// 	findRestaurantsSpecific(db, function() {
// 		db.close();
// 	})
// });



MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected to server.');

	findRestaurantsSymbols(db, function() {
		db.close();
	})
});