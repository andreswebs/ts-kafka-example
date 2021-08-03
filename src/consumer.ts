import { Kafka } from 'kafkajs';
import { getSASL } from './sasl-aws';
import { config, topic, groupId, useAWS } from './config';

async function run() {
  if (useAWS) {
    const sasl = await getSASL();
    config.sasl = sasl;
  }

  const kafka = new Kafka(config);

  const consumer = kafka.consumer({ groupId });
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
}

run().catch(console.error);
