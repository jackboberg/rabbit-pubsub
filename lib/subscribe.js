const Channel = require('@jackrabbit/channel')
const SerializeError = require('serialize-error')

module.exports = (url, opts) => {
  return (ex, worker) => {
    Channel(url, opts, (err, ch, conn) => {
      if (err) throw err

      ch.assertExchange(ex, 'fanout', { durable: false })
      ch.assertQueue('', { exclusive: true }, (err, queue) => {
        if (err) throw err

        ch.bindQueue(queue.queue, ex, '')
        ch.consume(queue.queue, (msg) => {
          var data = JSON.parse(msg.content.toString())

          worker(data, (err, result) => {
            if (err) result = SerializeError(err)

            return result
          })
        },
        { noAck: true }
        )
      })
    })
  }
}
