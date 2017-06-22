var oembed = require('oembed-auto');

var url = "https://soundcloud.com/zachberry/first-sunrizer2";

oembed(url, function(err, data) {
	console.log(data);
});

// oembed.fetch(url, { maxwidth:1920 }, function(err, res) {
// 	console.log(res);
// });