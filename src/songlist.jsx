export default class Songlist extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var self = this;
		var onSelectTrack = this.props.onSelectTrack;
		var curIndex = this.props.playlist.currentIndex;
		var items = this.props.playlist.items.map(function(item, index) {
			return <li key={index} onClick={onSelectTrack.bind(self, index)}>{item.error ? '!' : ''}{index === curIndex ? '*' : ''}{item.title}</li>;
		});

		return (
			<div className="songlist">
				<h5>{this.props.playlist.title}</h5>
				<ul>
					{items}
				</ul>
			</div>
		);
	}
}