# @jackrabbit/pubsub

[![Greenkeeper badge](https://badges.greenkeeper.io/jackboberg/rabbit-pubsub.svg)](https://greenkeeper.io/)

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![license][license-image]](LICENSE.md)

amqplib wrapper for easier rabbitmq scripting of pub/sub model


## Install

`npm install @jackrabbit/pubsub`


## Usage

### `pubsub(url, [options])`

The exported function takes the same parameters as [`amqplib.connect`][amqplib],
and returns a object with two exported functions, `publish` and `subscribe`.


### `publish(exchange, message, done)`

Sends data to subscribers and yields.

```js
const { publish } = require('@jackrabbit/pubsub')(url)

publish('tasks', { message: true }, (err) => {
  if (err) throw err

  // message delivered
})
```

### `subscribe(exchange, worker)`

Consumes messages on subscribed topics and passes them to worker. When worker calls
done acknowledges the message and sends the result to the client.

```js
const { subscribe } = require('@jackrabbit/pubsub')(url)

subscribe('tasks', (msg, done) => {
  // do work

  done(null, { result: true })
})
```

## Contribute

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.


## License

[MIT](LICENSE.md)


[npm-image]: https://img.shields.io/npm/v/@jackrabbit/pubsub.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@jackrabbit/pubsub
[travis-image]: https://img.shields.io/travis/jackboberg/rabbit-pubsub.svg?style=flat-square
[travis-url]: https://travis-ci.org/jackboberg/rabbit-pubsub
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square

[amqplib]: http://www.squaremobius.net/amqp.node/channel_api.html#connect
