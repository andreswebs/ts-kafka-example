import { Kafka } from 'kafkajs';
import { config, topic, groupId } from './config';

const kafka = new Kafka(config);

const consumer = kafka.consumer({ groupId });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received: ', {
        topic,
        partition,
        offset: message.offset,
        value: message.value ? message.value.toString() : undefined,
      });
    },
  });
};

run().catch(console.error);
