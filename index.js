module.exports = function(stream, options) {
	var consume, nextChunk, started = false, finished = false;

	var writeable = new require('stream').Writable(options);

	const hasChunk = function(cb) {
		consume = (data) => {
			cb(null, data);
			nextChunk();
		};

		if (!started) {
			stream.pipe(writeable);
			started = true;
		}
	};

	writeable._write = function(chunk, encoding, callback) {
		nextChunk = callback;
		consume({
			chunk: chunk,
			encoding: encoding
		});
	};

	writeable.on('finish', function() {
		finished = true;
	});

	return function*() {
		if (finished) {
			return null;
		}

		var data = yield hasChunk;
		return data;
	};
};
