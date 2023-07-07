import IOrder from "../../interfaces/Order";
import prisma from "../../lib/db";
import { kafkaConsumer } from "../kafkaConsumer";


export async function newOrderConsumer() {
    console.log('NEW CLIENT LISTENING');
    const consumer = await kafkaConsumer("new-order", 'new-order')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as IOrder

            // const result = await prisma..create({
            //     data: messageObject
            // })

            // console.log(result);
        }
    })
}

