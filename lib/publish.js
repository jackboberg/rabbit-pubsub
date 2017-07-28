const Channel = require('@jackrabbit/channel')

module.exports = (url, opts) => {
  return (ex, msg, done) => {
    Channel(url, opts, (err, ch, conn) => {
      if (err) return done(err)

      ch.assertExchange(ex, 'fanout', { durable: false }, (err) => {
        if (err) return done(err)

        ch.publish(ex, '', Buffer.from(JSON.stringify(msg)))

        done(err)
      })
    })
  }
}
