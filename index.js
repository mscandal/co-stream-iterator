module.exports = function(stream, options) {
	var writeable = new require('stream').Writable(options);

	var process, cb, started = false, finished = false;

	writeable._write = function(chunk, encoding, callback) {
		process({chunk, encoding});
		cb = callback;
	};

	writeable.on('finish', function() {
		finished = true;
	});

	const hasChunk = function(cb) {
		process = (chunk) => {
			cb(null, chunk);
		};
	};

	return function*() {
		if (finished) {
			return null;
		}

		if (!started) {
			stream.pipe(writeable);
			started = true;
		}

		cb && cb();

		var data = yield hasChunk;
		return data;
	};
};
