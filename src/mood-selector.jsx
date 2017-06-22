export default class MoodSelector extends React.Component {
	constructor(props) {
		super(props);

		console.clear();
		console.log(this.props.playlists);
	}

	render() {
		//@TODO - don't like that I'm doing this obj-->array stuff
		//also order is not being respected

		var buttons = Object.keys(this.props.playlists).map((function(playlistTitle, index) {
			var playlist = this.props.playlists[playlistTitle];
			var current = playlist === this.props.current;
			return <button key={index} onClick={this.props.onSelectMood.bind(this, playlist.title)}>{current ? '***' : ''}{playlist.title} ({playlist.length})</button>;
		}).bind(this));
		return (
			<div className="mood-selector">
				{buttons}
			</div>
		);
	}
}