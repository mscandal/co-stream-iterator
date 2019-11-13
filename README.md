*This is now not really needed as [node streams are now async iterators](https://nodejs.org/api/stream.html#stream_streams_compatibility_with_async_generators_and_async_iterators)*

# co-stream-iterator

This library gives you an easy way to process data coming from a stream linearly and synchronously using [co](https://github.com/tj/co) or [koa](https://github.com/koajs/koa).


```js
var co = require('co');
var request = require('request');
var iterator = require('co-stream-iterator');

co(function*() {
  var chunk, encoding;
  var read = iterator(request('http://google.com'), {});

  while (data = yield read) {
    console.log('data', data.encoding, data.chunk.toString());
  }
}).then(console.log);
```

It's even nicer looking when using destructuring:

```js
while ({encoding, chunk} = yield read) {
  console.log('data', encoding, chunk.toString());
}
```

All you do is pass in your readable stream and your [options for the writable stream](https://nodejs.org/api/stream.html#stream_constructor_new_stream_writable_options) it creates under the hood. This makes object streams possible to work with as well. The while loop ends when the data stops flowing. This is triggered by the generator returning `null`.
