//https://docs.mongodb.com/getting-started/node/query/

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var assert = require('assert');
var ObjectId = MongoDB.ObjectID;

var url = 'mongodb://localhost:27017/test';

var insertDocument = function(db, callback) {
	db.collection('playlists').insertOne({
		'playlists': [
			{
				'order': '0',
				'title': 'In The Town',
				'songs': []
			},
			{
				'order': '1',
				'title': 'Exploring',
				'songs': []
			},
			{
				'order': '2',
				'title': 'Mystery',
				'songs': []
			},
			{
				'order': '3',
				'title': 'Light Battle',
				'songs': []
			},
			{
				'order': '4',
				'title': 'Deadly Battle',
				'songs': []
			},
			{
				'order': '5',
				'title': 'Victory!',
				'songs': []
			},
			{
				'order': '6',
				'title': 'Defeat!',
				'songs': []
			}
		]
	}, function(err, result) {
		assert.equal(err, null);
		console.log('Inserted a document into the playlists collection');

		callback();
	});
};


MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected to server.');

	insertDocument(db, function() {
		db.close();
	})
});