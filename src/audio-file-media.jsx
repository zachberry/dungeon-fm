export default class AudioFileMedia extends React.Component {
	constructor(props) {
		super(props);
		this.hasLoaded = false;
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.playing !== this.props.playing)
		{
			if(nextProps.playing)
			{
				this.refs.self.play();
			}
			else
			{
				this.refs.self.pause();
			}
		}

		if(nextProps.volume !== this.props.volume)
		{
			this.refs.self.volume = nextProps.volume / 100;
		}

		if(nextProps.newPlayheadPosition !== this.props.newPlayheadPosition)
		{
			this.refs.self.currentTime = nextProps.newPlayheadPosition / 100 * this.refs.self.duration;
		}
	}


	getCurrentTime(callback) {
		callback(0);
	}

	shouldComponentUpdate() {
		return false;
	}

	componentDidMount() {
		this.refs.self.volume = this.props.volume / 100;
		if(this.props.playing) this.refs.self.play();
	}

	onLoadedData() {
		this.hasLoaded = true;
	}

	onPause(event) {
		// Pause events can be fired before ended when the file has ended
		// To avoid triggering playerPause we see if we are at the end,
		// if so, don't fire.
		if(event.target.currentTime === event.target.duration) return false;
		this.props.onPlayerPause.bind(this)();
	}

	onEnded(event) {
		console.log('>>>>>ended', event);
		this.props.onDone.bind(this)();
	}

	onSeeked(event) {
		//this.props.onSetPlayheadPosition(event.target.currentTime / event.target.duration * 100);
	}

	onTimeUpdate(event) {
		this.props.onSetPlayheadPosition(event.target.currentTime / event.target.duration * 100);
	}

	render() {
		return (
			<audio
				ref="self"
				controls="1"
				onEnded={this.onEnded.bind(this)}
				onPlay={this.props.onPlayerPlay.bind(this)}
				onPause={this.onPause.bind(this)}
				onError={this.props.onError.bind(this)}
				onSeeked={this.onSeeked.bind(this)}
				onTimeUpdate={this.onTimeUpdate.bind(this)}
				onLoadedData={this.onLoadedData.bind(this)}
				src={this.props.media.mediaId}
				volume="0.1"
			/>
		);
	}
}