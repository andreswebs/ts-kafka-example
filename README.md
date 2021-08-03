# ts-kafka-example

Example KafkaJS usage in TypeScript with AWS IAM authentication.


## Configuration

Add the broker hostnames to the `KAFKA_BROKERS` environment variable as a comma-separated list:

```sh
export KAFKA_BROKERS="broker1.example.com:9098,broker2.example.com:9098"
```

See the `src/config.ts` file for other available environment variables.

## Run

```sh
ts-node ./src/producer.ts
```

```sh
ts-node ./src/consumer.ts
```

## Authors

**Andre Silva** - [@andreswebs](https://github.com/andreswebs)


## License

This project is licensed under the [Unlicense](UNLICENSE.md).


## Acknowledgements

Adapted from:

<https://github.com/maddymanu/TypeScript-KafkaJS-Example>


## References

<https://kafka.js.org/docs/configuration#aws-iam-example>

<https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html>
