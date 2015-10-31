const co = require('co');
const request = require('request');
const iterator = require('./index');

co(function*() {
  let chunk, encoding;

  const read = iterator(request('http://google.com'), {});

  while ({chunk, encoding} = yield read) {
    console.log('data', encoding, chunk.toString());
  }
}).then(console.log);
