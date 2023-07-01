import kafka from "."

export const kafkaConsumer = async (topic: string, group_id: string) => {
    const consumer = kafka.consumer({ groupId: group_id })
    await consumer.connect()
    console.log(topic);

    await consumer.subscribe({ topic, fromBeginning: true })

    return consumer
}