import IOrder from "../../interfaces/Order";
import prisma from "../../lib/db";
import { kafkaConsumer } from "../kafkaConsumer";

export async function updateOrderStatusConsumer() {
    console.log("UPDATA ORDER IS LISTENING");

    const consumer = await kafkaConsumer("update-order-status", 'update-order-status')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as {
                id: number,
                external_id: number,
                client_id: number,
                deliveryman_id: number,
                lat: number,
                lng: number,
                status: 'accepted' | 'finished'
            }

            console.log(messageObject);
            const result = await prisma.order.update({
                where: {
                    id: messageObject.external_id
                },
                data: {
                    deliveryman_id: messageObject.deliveryman_id,
                    order_status_id: messageObject.status == 'accepted' ? 3 : 4,
                    finished_at: messageObject.status == 'finished' ? new Date() : null
                }
            })
            console.log(result);

        }
    })
}

updateOrderStatusConsumer()