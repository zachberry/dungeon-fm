var oembed = require('oembed-auto');
var getYouTubeID = require('get-youtube-id');
var getSoundCloudID = require('./get-soundcloud-id');

var getMediaId = function(data) {
	switch(data.provider_name)
	{
		case 'SoundCloud':
			return getSoundCloudID(data.html);

		case 'YouTube':
			return getYouTubeID(data.html);
	}

	return '';
};

var getSongFromUrl = function(url) {
	var promise = new Promise(function(resolve, reject) {
		oembed(url, function(err, data) {
			var song;

			if(err)
			{
				song = {
					service: 'audiofile',
					title: url,
					url: url
				};
			}
			else
			{
				console.log(data);
				console.log('---');
				song = {
					service: data.provider_name,
					mediaId: getMediaId(data),
					title: data.title,
					authorName: data.author_name,
					authorUrl: data.author_url,
					thumbnailUrl: data.thumbnail_url,
					url: url
				};
			}

			resolve(song);
		});
	});

	return promise;
};

module.exports = getSongFromUrl;

//youtube
//https://www.youtube.com/watch?v=YE-ruFpRGKk
/*
{ type: 'video',
	thumbnail_height: 360,
	provider_url: 'https://www.youtube.com/',
	thumbnail_url: 'https://i.ytimg.com/vi/YE-ruFpRGKk/hqdefault.jpg',
	html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/YE-ruFpRGKk?feature=oembed" frameborder="0" allowfullscreen></iframe>',
	provider_name: 'YouTube',
	version: '1.0',
	title: 'Eden Grey - Interview at Cymru Beats 2016',
	author_name: 'sonicstate',
	height: 270,
	author_url: 'https://www.youtube.com/user/sonicstate',
	thumbnail_width: 480,
	width: 480 }
*/

//soundcloud
// { version: 1,
//   type: 'rich',
//   provider_name: 'SoundCloud',
//   provider_url: 'http://soundcloud.com',
//   height: 400,
//   width: '100%',
//   title: '4th - A-minor - Mix - Alt1 - Goth - Mix3 by zachberry',
//   description: '',
//   thumbnail_url: 'http://a1.sndcdn.com/images/fb_placeholder.png?1469110696',
//   html: '<iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&url=https://api.soundcloud.com/tracks/274916038&show_artwork=true"></iframe>',
//   author_name: 'zachberry',
//   author_url: 'https://soundcloud.com/zachberry' }


// fetch(url)
// 	.then(function(response) {
// 		response.json().then(function(json) {
// 			console.log('json', json);
// 			console.log(json.author_name);
// 			console.log(json.thumbnail_url);
// 			console.log(json.title);
// 			console.log(getYouTubeID(json.html));
// 		})
// 	});
