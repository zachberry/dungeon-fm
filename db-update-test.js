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

var update = function(db, callback) {
	db.collection('playlists').updateOne(
		{
			'_id': ObjectId('5793f42147aa1259e592fb07'),
			'playlists.order': '0'
		},
		{
			$push: { 'playlists.$.songs': { 'example':'two' }}
			// $currentDate: { 'lastModified':true }
		}, function(err, results) {
			assert.equal(null, err);

			console.log(results.result);
			callback();
		}
	);
};

var addAPlaylist = function(db, callback) {
	db.collection('playlists').updateOne(
		{ '_id':ObjectId('5793f42147aa1259e592fb07') },
		{
			$push: { 'playlists':{
				'title': 'Test',
				'songs': []
			}}
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

	update(db, function() {
		db.close();
	})
});