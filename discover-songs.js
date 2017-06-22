// Reads in a file called "seed.json" and processes the song URLs
// to turn them into song objects.

var getSong = require('./get-song');
var fs = require('fs');

var promises = [];
var urlToPositionLookupTable = {};

var content = fs.readFileSync('seed.json');
var seed = JSON.parse(content);

seed.playlists.forEach(function(playlist) {
	playlist.songs.forEach(function(songUrl, index) {
		urlToPositionLookupTable[songUrl] = {
			playlist: playlist,
			index: index
		};

		promises.push(getSong(songUrl));
	});
});

Promise.all(promises).then(function(values) {
	values.forEach(function(songData) {
		var lookup = urlToPositionLookupTable[songData.url];
		lookup.playlist.songs[lookup.index] = songData;
	});

	console.log(JSON.stringify(seed));
});