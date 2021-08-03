import reader from 'readline-sync';
import { Kafka, Producer } from 'kafkajs';

import { getSASL } from './sasl-aws';

import { config, topic, useAWS } from './config';

const sendPayload =
  (producer: Producer) =>
  (topic: string) =>
  (key: string) =>
  (value: string) => {
    return producer.send({
      topic,
      messages: [{ key, value }],
    });
  };

async function main() {
  if (useAWS) {
    const sasl = await getSASL();
    config.sasl = sasl;
  }

  const kafka = new Kafka(config);

  const transactionalId = (Math.random() + 1).toString(36).substring(2); // unique producer ID

  const producer = kafka.producer({
    maxInFlightRequests: 1,
    idempotent: true,
    transactionalId,
  });

  try {
    await producer.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  /* eslint-disable-next-line*/
  while (true) {
    const input = reader.question('Data: ');
    if (input === 'exit') {
      process.exit(0);
    }
    try {
      await sendPayload(producer)(topic)('test')(input);
    } catch (e) {
      console.error('Caught Error while sending:', e);
    }
  }
}

main();
