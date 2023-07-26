import kafka from '.'
import { SendEvents } from '../../domain/events/send-event';

export class KafkaSendMessage implements SendEvents {
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


