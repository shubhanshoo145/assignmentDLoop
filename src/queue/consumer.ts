import * as amqp from 'amqplib/callback_api'
import { IIncomingMessage, IncomingMessage } from './consumingIncomingMessage'

const createMQConsumer = (amqpURl: string, queueName: string) => {
  console.log('Connecting to RabbitMQ...')
  return () => {
    amqp.connect(amqpURl, (err, conn) => {
      if (err) {
        console.log('Error connecting to RabbitMQ', err);
        throw err
      }

      conn.createChannel((err, chan) => {
        if (err) {
          console.log('Error while creating a channel in RabbitMQ consumer', err);
          throw err
        }

        console.log('Connected to RabbitMQ')
        chan.assertQueue(queueName, { durable: true })
        chan.consume(queueName, (msg: amqp.Message | null) => {
          if (msg) {
            const parsed = JSON.parse(msg.content.toString())
            console.log('Consumer', parsed);
            const incomingMessage: IIncomingMessage = new IncomingMessage();
            incomingMessage.consumeIncomingMessage(parsed).then((res) => {
              console.log('Message consumption successful')
            }).catch(err => {
              console.log('Error while consuming queue message', err)
            })
          }
        })
      })
    })
  }
}

export default createMQConsumer