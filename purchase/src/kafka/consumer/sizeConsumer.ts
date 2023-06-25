import ISize from "../../interfaces/Size";
import prisma from "../../lib/db";
import { kafkaConsumer } from "../kafkaConsumer";

export async function createSizeConsumer() {
    console.log('NEW SIZE LISTENING');
    const consumer = await kafkaConsumer("new-size", 'new-size')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as Omit<ISize, 'id'>

            const result = await prisma.size.create({
                data: {
                    external_id: messageObject.external_id,
                    name: messageObject.name
                }
            })

            console.log(result);
        }
    })
}

export async function updateSizeConsumer() {
    console.log('UPDATE SIZE LISTENING');
    const consumer = await kafkaConsumer('update-size', 'update-size')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as Omit<ISize, 'id'>
            const result = await prisma.size.update({
                where: {
                    external_id: messageObject.external_id
                },
                data: { name: messageObject.name }
            })

            console.log(result);
        }
    })
}

export async function deleteSizeConsumer() {
    console.log('DELETE SIZE LISTENING');
    const consumer = await kafkaConsumer('delete-size', 'delete-size')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as { external_id: number }
            const result = await prisma.size.delete({
                where: {
                    external_id: messageObject.external_id
                },
            })

            console.log(result);
        }
    })
}

createSizeConsumer()
updateSizeConsumer()
deleteSizeConsumer()