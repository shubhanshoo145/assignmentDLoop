import { StreetsService } from "./israeliStreets";
import createMQConsumer from "./queue/consumer";
import createMQProducer from "./queue/producer";

const cityName = process.env.CITY;
const amqpUrl = `${process.env.QUEUE_URL}#/`;
const queueName = 'cities'
try {
    const producer = createMQProducer(amqpUrl, queueName);
    const consumer = createMQConsumer(amqpUrl, queueName);
    consumer();

    StreetsService.getStreetsInCity(cityName).then(res => {
        const { streets } = res;
        for (const street of streets) {
            StreetsService.getStreetInfoById(street.streetId).then(res => {
                producer(JSON.stringify(res));
            })
        }
    }).catch(err => {
        console.error('Error while getting all streets in city', err);
    })
} catch (err) {
    console.log('Error while initiating the application', err);
    process.exit(1);
}