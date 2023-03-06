import * as amqp from 'amqplib/callback_api'

const createMQProducer = (amqpUrl: string, queueName: string) => {
  console.log('Connecting to RabbitMQ...')
  let ch: any
  amqp.connect(amqpUrl, (err: Error, connection: amqp.Connection) => {
    if (err) {
      console.log('Error connecting to RabbitMQ: ', err)
      return
    }

    connection.createChannel((err, channel) => {
      if (err) {
        console.log('Error creating channel: ', err)
        return
      }

      ch = channel
      console.log('Connected to RabbitMQ')
    })
  })
  return (msg: string) => {
    console.log('Produce message to RabbitMQ...')
    ch.sendToQueue(queueName, Buffer.from(msg))
  }
}

export default createMQProducer