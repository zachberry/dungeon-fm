var express = require('express');
var oembed = require('oembed-auto');
// var http = require('http');
// var massive = require('massive');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var bodyParser = require('body-parser');



var mongoConnectionUrl = 'mongodb://localhost:27017/test';


// var connectionString = 'postgres://massive:password@localhost/chinook'
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// var massiveInstance = massive.connectSync({ connectionString:connectionString });

// app.set('db', massiveInstance);

var list = function(db, callback) {
	var cursor = db.collection('playlists').find();

	cursor.each(function(err, doc) {
		// assert.equal(err, null);

		callback(doc);
	});
};

app.use(express.static('public'));

app.get('/', function(req, res) {
	// res.send('SUP');
	res.render('index.html');
});

app.get('/oembed', function(req, res) {
	oembed(req.query.url, function(err, data) {
		if(err) return res.send('error');
		res.send(data);
	});
});
app.get('/oembed/html', function(req, res) {
	oembed(req.query.url, function(err, data) {
		if(err) return res.send('error');
		res.send(data.html);
	});
});
app.get('/test', function(req, res) {
	res.send('success');
});
app.get('/api/playlists', function(req, res) {
	// var db = app.get('db');
	// console.log(db);
	// res.send('db');
	// return;

	// list();

	MongoClient.connect(mongoConnectionUrl, function(err, db) {
		list(db, function(doc) {
			db.close();
			res.send(doc);
		})
	});
});
app.get('/api/playlists/:id', function(req, res) {
	res.send(req.params);
});

//curl -X POST -d "{\"playlists_id\": \"123\", \"playlist_title\": \"On The Road\", \"song\": \"song\"}" -H "Content-Type: application/json" http://localhost:3030/api/song
app.post('/api/song', function(req, res) {
	// res.send(res);
	var playlistsId = req.body.playlists_id;
	var playlistTitle = req.body.playlist_title;
	var song = req.body.song;

	res.send({
		playlistsId: playlistsId,
		playlistTitle: playlistTitle,
		song: song
	});
});


app.listen(3030, function() {
	console.log('listen on 3030');
});