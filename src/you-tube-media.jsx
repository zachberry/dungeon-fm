export default class YouTubeMedia extends React.Component {
	constructor(props) {
		super(props);
		this.hasLoaded = false;


	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.playing !== this.props.playing)
		{
			if(nextProps.playing)
			{
				this.player.playVideo();
			}
			else
			{
				this.player.pauseVideo();
			}
		}

		if(nextProps.volume !== this.props.volume)
		{
			this.player.setVolume(nextProps.volume);
		}

		if(nextProps.newPlayheadPosition !== this.props.newPlayheadPosition)
		{
			this.player.seekTo(nextProps.newPlayheadPosition / 100 * this.player.getDuration());
		}
	}

	componentDidMount() {
		if(window.YT && window.YT.Player)
		{
			this.loadPlayer();
		}
		else
		{
			window.onYouTubeIframeAPIReady = this.loadPlayer.bind(this);
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	loadPlayer() {
		this.player = new window.YT.Player(this.refs.self, {
			height: '390',
			width: '640',
			videoId: this.props.media.mediaId,
			events: {
				'onReady': (function(event) {
					this.hasLoaded = true;
					event.target.setVolume(this.props.volume);
					// event.target.seekTo(this.props.media.mark, true);
					// this.props.media.mark = 0;
					if(this.props.playing) event.target.playVideo();
				}).bind(this),
				'onError': (function(event) {
					console.log('YT ERRRORRR');
					console.log(event);
					this.props.onError();
				}).bind(this),
				'onStateChange': (function(event) {
					switch(event.data)
					{
						case 0: // ended
							this.props.onDone();
							break;

						case 1: // playing
							this.props.onPlayerPlay();
							break;

						case 2: // paused
							this.props.onPlayerPause();
							break;
					}
				}).bind(this)
			}
		});

		this.playheadIntervalId = window.setInterval((function() {
			// console.log('tick', this.player.getCurrentTime());
			this.props.onSetPlayheadPosition(this.player.getCurrentTime() / this.player.getDuration() * 100);
		}).bind(this), 1000);
	}

	componentWillUnmount() {
		window.clearInterval(this.playheadIntervalId);
	}

	getCurrentTime() {
		this.player.getCurrentTime();
	}

	render() {
		return (
			<div className="you-tube-media" ref="self">
				Loading...
			</div>
		);
	}
}