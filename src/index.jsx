require('./index.scss');

import Player from './player'
import Playlist from './playlist'

// var getYouTubeID = require('get-youtube-id');

// fetch("http://localhost:3030/oembed?url=https://www.youtube.com/watch?v=YE-ruFpRGKk")
// .then(function(response) {
// 	response.json().then(function(json) {
// 		console.log('json', json);
// 		console.log(json.author_name);
// 		console.log(json.thumbnail_url);
// 		console.log(json.title);
// 		console.log(getYouTubeID(json.html));
// 	})
// });















var playlistsData = require('json!../playlists.json').playlists;

class Main extends React.Component {
	constructor(props) {
		super(props);


		/*bind(this, 'town')}>Town</button>
				<button onClick={this.props.onSelectMood.bind(this, 'road')}>On The Road</button>
				<button onClick={this.props.onSelectMood.bind(this, 'mystery')}>Mystery</button>
				<button onClick={this.props.onSelectMood.bind(this, 'skirmish')}>Skirmish</button>
				<button onClick={this.props.onSelectMood.bind(this, 'deadly')}>Deadly Battle</button>
				<button onClick={this.props.onSelectMood.bind(this, 'heroic')}>Heroic Victory</button>
				<button onClick={this.props.onSelectMood.bind(this, 'defeat')}>D*/

		var curPlaylist;
		this.playlists = {};
		console.log(playlistsData);
		for(var i = 0, len = playlistsData.length; i < len; i++)
		{
			curPlaylist = playlistsData[i];
			console.log(curPlaylist);
			this.playlists[curPlaylist.title] = new Playlist(curPlaylist.title, curPlaylist.songs);
			this.playlists[curPlaylist.title].shuffle();
		}

		// this.playlists = {
		// 	'town': new Playlist('town'),
		// 	'road': new Playlist('road'),
		// 	'mystery': new Playlist('mystery'),
		// 	'skirmish': new Playlist('skirmish'),
		// 	'deadly': new Playlist('deadly'),
		// 	'heroic': new Playlist('heroic'),
		// 	'defeat': new Playlist('defeat')
		// };

		window.__p = this.playlists;

		// for(var name in this.playlists)
		// {
		// 	this.playlists[name]
		// 		.add('soundcloud', '273838623')
		// 		.add('soundcloud', '272478998')
		// 		.add('audiofile', 'http://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
		// 		.add('audiofile', 'http://www.w3schools.com/html/horse.ogg')
		// 		.add('youtube', 'wGyUP4AlZ6I')
		// 		.add('youtube', 'bCGmUCDj4Nc')
		// 		.add('youtube', 'wGyUP4AlZ6I')
		// 		.add('youtube', 'h0KLnTYozso')
		// }
	}



	render() {
		return (
			<div className='index'>
				<h1>Dungeon FM</h1>

				<Player playlists={this.playlists} />
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('main'));