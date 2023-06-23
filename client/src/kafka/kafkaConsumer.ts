import kafka from "."

export const kafkaConsumer = async (topic: string) => {
    const consumer = kafka.consumer({ groupId: "PIZZA_APP" })

    await consumer.connect()


    await consumer.subscribe({ topic })

    return consumer
}