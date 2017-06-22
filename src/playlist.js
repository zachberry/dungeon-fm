export default class Playlist {
	constructor(title, songs) {
		this.title = title;
		this.clear();

		if(songs)
		{
			for(var i = 0, len = songs.length; i < len; i++)
			{
				this.add(songs[i]);
			}
		}
	}

	clear() {
		this._queue = [];
		this._positionIndex = 0;

		return this;
	}

	shuffle() {
		var j, x, i;
		for (i = this._queue.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = this._queue[i - 1];
			this._queue[i - 1] = this._queue[j];
			this._queue[j] = x;
		}

		return this;
	}

	add(song) {
		//@TODO
		song.error = false;
		song.mark = 0;

		this._queue.push(song);

		return this;
	}

	next() {
		if(this.isAtEnd) return this.gotoStart();

		this.markCurrent(0);
		this._positionIndex++;
		return this.current;
	}

	back() {
		if(this.isAtStart) return this.gotoEnd();

		this.markCurrent(0);
		this._positionIndex--;
		return this.current;
	}

	goto(index) {
		if(index < 0 || index >= this._queue.length) return;

		this.markCurrent(0);
		this._positionIndex = index;
		return this.current;
	}

	gotoStart() {
		return this.goto(0);
	}

	gotoEnd() {
		return this.goto(this._queue.length - 1);
	}

	markCurrent(time) {
		this.current.mark = time;

		return this;
	}

	get current() {
		return this._queue[this._positionIndex];
	}

	get currentIndex() {
		return this._positionIndex;
	}

	get items() {
		return Object.assign([], this._queue);
	}

	get isAtEnd() {
		return this._positionIndex === this._queue.length - 1;
	}

	get isAtStart() {
		return this._positionIndex = 0;
	}

	get length() {
		return this._queue.length;
	}

	// get canGoNext() {
	// 	return this._positionIndex + 1 < this._queue.length;
	// }

	// get canGoBack() {
	// 	return this._positionIndex - 1 >= 0;
	// }
}