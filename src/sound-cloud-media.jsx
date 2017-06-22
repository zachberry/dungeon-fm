export default class SoundCloudMedia extends React.Component {
	constructor(props) {
		super(props);
		this.playing = false;
		this.currentPosition = 0;
		this.duration = 0;
		this.hasLoaded = false;
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);

		if(nextProps.playing !== this.props.playing)
		{
			if(nextProps.playing && !this.playing)
			{
				this.scWidget.play();
			}
			else if(!nextProps.playing && this.playing)
			{
				this.scWidget.pause();
			}
		}

		if(nextProps.volume !== this.props.volume)
		{
			this.scWidget.setVolume(nextProps.volume / 100);
		}

		if(nextProps.newPlayheadPosition !== this.props.newPlayheadPosition)
		{
			this.scWidget.seekTo(nextProps.newPlayheadPosition / 100 * this.duration);
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	componentDidMount() {
		console.log('m');
		this.setupEvents();
	}

	componentDidUpdate() {
		console.log('u');
		this.setupEvents();
	}

	setupEvents() {
		this.scWidget = window.SC.Widget(this.refs.self);
		window._s = this.scWidget;



		this.scWidget.bind(window.SC.Widget.Events.FINISH, (function() {
			console.log('sc.finish');
			this.props.onDone();
		}).bind(this));

		this.scWidget.bind(window.SC.Widget.Events.READY, (function() {
			console.log('sc.ready');
			this.scWidget.getDuration((function(value) {
				this.duration = value;
			}).bind(this));

			this.hasLoaded = true;
			this.scWidget.setVolume(this.props.volume / 100);
			if(this.props.playing) this.scWidget.play();
		}).bind(this));

		this.scWidget.bind(window.SC.Widget.Events.PAUSE, (function(data) {
			console.log('-----------sc.pause', data.relativePosition, data.relativePosition.toPrecision(2));
			// The pause event gets fired when the media has ended.
			// We want to ignore this pause, so we check relativePosition,
			// however it isn't truly 1, so we use toPrecision to round it
			if(data.relativePosition.toPrecision(2) === '1.0') return;

			this.playing = false;
			this.props.onPlayerPause();
		}).bind(this));

		this.scWidget.bind(window.SC.Widget.Events.PLAY, (function() {
			console.log('sc.play');
			// this.scWidget.seekTo(this.props.media.mark);
			// this.props.media.mark = 0;
			this.playing = true;
			this.props.onPlayerPlay();
		}).bind(this));

		this.scWidget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (function(data) {
			// console.log('playProgress')

			this.currentPosition = data.currentPosition;
			this.props.onSetPlayheadPosition(data.relativePosition * 100);
		}).bind(this));

		this.scWidget.bind(window.SC.Widget.Events.ERROR, (function(event) {
			console.log('sc.error', arguments);

			this.props.onError();
		}).bind(this));
	}

	getCurrentTime() {
		return this.currentPosition;
	}

	render() {
		return (
			<iframe
				ref="self"
				className="sound-cloud-media"
				width='100%'
				height='166'
				scrolling='no'
				frameBorder='no'
				src={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + this.props.media.mediaId + '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false'}
			/>
		);
	}
}