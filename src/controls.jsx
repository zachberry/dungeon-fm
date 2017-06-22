export default class Controls extends React.Component {
	constructor(props) {
		super(props);
		this.listenForPlayheadPositionUpdates = true;

		this.state = {
			playheadPosition: this.props.playheadPosition
		};
	}

	componentWillReceiveProps(nextProps) {
		if(!this.listenForPlayheadPositionUpdates) return;

		this.setState({
			playheadPosition: nextProps.playheadPosition
		});
	}

	onVolumeChange(event) {
		this.props.onSetVolume(event.target.value);
	}

	onPlayheadPositionChange(event) {
		this.setState({
			playheadPosition: event.target.value
		});
	}

	onPlayheadPositionMouseDown(event) {
		this.listenForPlayheadPositionUpdates = false;
	}

	onPlayheadPositionMouseUp(event) {
		this.listenForPlayheadPositionUpdates = true;
		this.props.onSetPlayheadPosition(event.target.value);
	}

	// componentShouldUpdate() {
	// 	return this.listenForPlayheadPositionUpdates;
	// }

	render() {
		return (
			<div className="controls">
				<button onClick={this.props.onTogglePlay}>Play/Pause</button>
				<input type="range" min="0" max="100" value={this.props.volume} onChange={this.onVolumeChange.bind(this)} />
				<input
					type="range"
					min="0"
					max="100"
					value={this.state.playheadPosition}
					onMouseDown={this.onPlayheadPositionMouseDown.bind(this)}
					onMouseUp={this.onPlayheadPositionMouseUp.bind(this)}
					onChange={this.onPlayheadPositionChange.bind(this)}
				/>
				<button onClick={this.props.onBack.bind(this)}>&larr;</button>
				<button onClick={this.props.onNext.bind(this)}>&rarr;</button>
			</div>
		);
	}
}