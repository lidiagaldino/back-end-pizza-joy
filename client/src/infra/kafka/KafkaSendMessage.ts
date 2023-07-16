import { pathToFileURL } from 'url';
import kafka from '.'

class KafkaSendMessage {
    async execute(topic: string, payload: any) {
        const producer = kafka.producer({
            allowAutoTopicCreation: true
        })

        await producer.connect()
        console.log(`MESSAGE SENT TO TOPIC ${topic}`);
        console.log(payload);
        await producer.send({
            topic,
            messages: [
                { value: JSON.stringify(payload) }
            ]
        })

        await producer.disconnect()
    }
}

export default new KafkaSendMessage()