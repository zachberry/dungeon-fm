console.log('death theme? one shots? https://www.youtube.com/watch?v=_qNBzZs7Po0&index=27&list=PLEFF7379399D6050F or https://www.youtube.com/watch?v=W7yDamKgN_I&index=28&list=PLEFF7379399D6050F')

require('./player.scss');

import YouTubeMedia from './you-tube-media'
import SoundCloudMedia from './sound-cloud-media'
import AudioFileMedia from './audio-file-media'
import Songlist from './songlist'
import Controls from './controls'
import MoodSelector from './mood-selector'

const HAS_LOADED_CHECK_DURATION = 5000;

export default class Player extends React.Component {
	constructor(props)
	{
		super(props);

		console.log(this.props.playlists);

		this.state = {
			playing: false,
			volume: 100,
			playheadPosition: 0,
			userSetPlayheadPosition: 0,
			playlist: this.props.playlists[Object.keys(this.props.playlists)[0]] //@TODO
		};
	}

	setMood(mood)
	{
		this.setState({
			playlist: this.props.playlists[mood]
		});
	}

	togglePlay()
	{
		console.log('___toggle play');

		this.setState({
			playing: !this.state.playing
		});
	}

	onPlayerPlay()
	{
		this.state.playlist.current.error = false; //@TODO

		this.setState({
			playing: true
		});
	}

	onPlayerPause()
	{
		this.setState({
			playing: false
		});
	}

	setVolume(volume)
	{
		this.setState({
			volume: volume
		});
	}

	setPlayheadPosition(perc)
	{
		this.setState({
			// userSetPlayheadPosition: perc,
			playheadPosition: perc
		});
	}

	setUserSetPlayheadPosition(perc)
	{
		this.setState({
			userSetPlayheadPosition: perc,
			playheadPosition: perc
		});
	}

	back()
	{
		this.startTimerToCheckIfMediaHasLoaded();
		this.state.playlist.back();
		this.forceUpdate();
	}

	next()
	{
		this.startTimerToCheckIfMediaHasLoaded();
		this.state.playlist.next();
		this.forceUpdate();
	}

	gotoTrack(index)
	{
		this.startTimerToCheckIfMediaHasLoaded();
		this.state.playlist.goto(index);
		this.forceUpdate();
	}

	onPlayError()
	{
		console.log('error!');
		this.state.playlist.current.error = true; //@TODO
		this.next();
	}

	startTimerToCheckIfMediaHasLoaded()
	{
		this.clearTimer();
		// if(!this.t)
		// {
		// 	this.t = 0;
		// }
		// this.t += 100;
		this.hasLoadedTimeoutId = window.setTimeout(this.onTimerCompleted.bind(this), HAS_LOADED_CHECK_DURATION);
	}

	onTimerCompleted()
	{
		console.log(this.refs.media);

		if(!this.refs.media.hasLoaded)
		{
			this.state.playlist.current.error = true;
			this.next();
		}
	}

	clearTimer()
	{
		window.clearTimeout(this.hasLoadedTimeoutId);
	}



	getMediaComponent(mediaItem)
	{
		// console.clear();
		// console.log('gmc', mediaItem);

		switch(mediaItem.service)
		{
			case 'YouTube':
				return <YouTubeMedia
							ref="media"
							playing={this.state.playing}
							volume={this.state.volume}
							newPlayheadPosition={this.state.userSetPlayheadPosition}
							media={mediaItem}
							onDone={this.next.bind(this)}
							onPlayerPlay={this.onPlayerPlay.bind(this)}
							onPlayerPause={this.onPlayerPause.bind(this)}
							onError={this.onPlayError.bind(this)}
							onSetPlayheadPosition={this.setPlayheadPosition.bind(this)}
						/>;
				break;

			case 'SoundCloud':
				return <SoundCloudMedia
							ref="media"
							playing={this.state.playing}
							volume={this.state.volume}
							newPlayheadPosition={this.state.userSetPlayheadPosition}
							media={mediaItem}
							onDone={this.next.bind(this)}
							onPlayerPlay={this.onPlayerPlay.bind(this)}
							onPlayerPause={this.onPlayerPause.bind(this)}
							onError={this.onPlayError.bind(this)}
							onSetPlayheadPosition={this.setPlayheadPosition.bind(this)}
						/>;
				break;

			case 'audiofile':
				return <AudioFileMedia
							ref="media"
							playing={this.state.playing}
							volume={this.state.volume}
							newPlayheadPosition={this.state.userSetPlayheadPosition}
							media={mediaItem}
							onDone={this.next.bind(this)}
							onPlayerPlay={this.onPlayerPlay.bind(this)}
							onPlayerPause={this.onPlayerPause.bind(this)}
							onError={this.onPlayError.bind(this)}
							onSetPlayheadPosition={this.setPlayheadPosition.bind(this)}
						/>;

			default:
				alert('Unsupported media service: ' + mediaItem.service)
				break;
		}
	}

	componentWillReceiveProps(nextProps)
	{
		if(nextProps.playlist !== this.state.playlist)
		{
			// this.state.playlist.markCurrent(this.refs.media.getCurrentTime());
			this.startTimerToCheckIfMediaHasLoaded();
		}
	}

	render()
	{
		return (
			<div className="player">
				<p>{this.state.playing ? 'PLAYING' : 'paused'}</p>
				<div className="controls">
					<button className="back">Back</button>
					<div className="now-playing">
						<div className="thumbnail">
							<img src={this.state.playlist.current.thumbnailUrl} />
						</div>
						<div className="right">
							<h1><a target="_blank" href={this.state.playlist.current.url}>{this.state.playlist.current.title}</a></h1>
							<h2><a target="_blank" href={this.state.playlist.current.authorUrl}>{this.state.playlist.current.authorName}</a></h2>
						</div>

					</div>
					<button className="next">Next</button>
				</div>
				<MoodSelector current={this.state.playlist} playlists={this.props.playlists} onSelectMood={this.setMood.bind(this)} />
				<Controls
					volume={this.state.volume}
					playheadPosition={this.state.playheadPosition}
					onTogglePlay={this.togglePlay.bind(this)}
					onSetVolume={this.setVolume.bind(this)}
					onSetPlayheadPosition={this.setUserSetPlayheadPosition.bind(this)}
					onBack={this.back.bind(this)}
					onNext={this.next.bind(this)}
				/>
				<Songlist playlist={this.state.playlist} onSelectTrack={this.gotoTrack.bind(this)} />
				<hr />
				<div className="media-container" key={this.state.playlist.title + '-' + this.state.playlist.currentIndex}>
					{
						this.getMediaComponent(this.state.playlist.current)
					}
				</div>
			</div>
		);
	}
}