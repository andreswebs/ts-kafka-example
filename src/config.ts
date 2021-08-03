import { KafkaConfig } from 'kafkajs';

const clientId = process.env.KAFKA_CLIENT_ID || 'kafka';
const ssl = process.env.KAFKA_SSL_DISABLE ? false : true;
const brokersString = process.env.KAFKA_BROKERS || '';
const topic = process.env.KAFKA_TOPIC || 'msgs';
const groupId = process.env.KAFKA_GROUP_ID || 'kafka';

const useAWS: boolean = process.env.KAFKA_AWS_DISABLE ? false : true;

const brokers = brokersString.split(',').map((s) => s.trim());

const config: KafkaConfig = {
  clientId,
  ssl,
  brokers,
};

export { config, topic, groupId, useAWS };
