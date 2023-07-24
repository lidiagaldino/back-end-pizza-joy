import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    brokers: ['healthy-crow-10093-us1-kafka.upstash.io:9092'],
    sasl: {
        mechanism: 'scram-sha-256',
        username: 'aGVhbHRoeS1jcm93LTEwMDkzJBl7NdG1rY9sIyAk5UuzAZn6th0ktvSbL0MVdwo',
        password: '77b6578639b940ab9df2e43c6424905c',
    },
    ssl: true,
})

// const producer = kafka.producer()
// producer.connect()
// // ...
// producer.disconnect()

// const consumer = kafka.consumer({ groupId: '$GROUP_NAME' })
// consumer.connect()
// // ...
// consumer.disconnect()

export default kafka