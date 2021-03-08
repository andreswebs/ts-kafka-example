const config = {
  clientId: 'kafka-example',
  kafka_topic: 'topic-01',
  brokers: ['broker:9092'],
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
};

export { config };
