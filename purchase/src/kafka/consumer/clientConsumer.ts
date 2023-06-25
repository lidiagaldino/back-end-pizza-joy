import IClient from "../../interfaces/Client";
import prisma from "../../lib/db";
import { kafkaConsumer } from "../kafkaConsumer";

export async function createClientConsumer() {
    console.log('NEW CLIENT LISTENING');
    const consumer = await kafkaConsumer("new-client", 'new-client')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as Omit<IClient, 'id'>

            const result = await prisma.client.create({
                data: messageObject
            })

            console.log(result);
        }
    })
}

export async function deleteClientConsumer() {
    const consumer = await kafkaConsumer("delete-client", 'delete-client')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const external_id = message.value!.toString() as unknown as number

            await prisma.client.delete({
                where: {
                    external_id
                }
            })
        }
    })
}

export async function updateClientConsumer() {
    console.log('UPDATE CLIENT LISTENING');
    const consumer = await kafkaConsumer("update-client", 'update-client')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as Omit<IClient, 'id'>

            const result = await prisma.client.update({
                where: {
                    external_id: messageObject.external_id
                },
                data: {
                    phone: messageObject.phone,
                    name: messageObject.name
                }
            })

            console.log(result);
        }
    })
}

updateClientConsumer()
createClientConsumer()
