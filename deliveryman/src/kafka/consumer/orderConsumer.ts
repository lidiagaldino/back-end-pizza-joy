import app from "../../app";
import IOrder from "../../interfaces/Order";
import prisma from "../../lib/db";
import Deliveryman from "../../services/Deliveryman";
import { kafkaConsumer } from "../kafkaConsumer";


export async function newOrderConsumer() {
    console.log('NEW ORDER LISTENING');
    const consumer = await kafkaConsumer("new-order", 'new-order')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as IOrder
            console.log(messageObject);

            const queue = await Deliveryman.findNearestDeliveryman(messageObject.location)
            console.log(queue);
            if (queue) app.io.to(`deliveryman_${queue[0].id}`).emit('new_order', messageObject)
        }
    })
}

newOrderConsumer()
