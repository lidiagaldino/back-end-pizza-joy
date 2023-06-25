import IClient from "../../interfaces/Client";
import IProduct from "../../interfaces/Product";
import prisma from "../../lib/db";
import { kafkaConsumer } from "../kafkaConsumer";

export async function createProductConsumer() {
    console.log('NEW PIZZA LISTENING');
    const consumer = await kafkaConsumer("new-pizza", 'new-pizza')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as Omit<IProduct, 'id'>

            const result = await prisma.product.create({
                data: {
                    external_id: messageObject.external_id,
                    description: messageObject.description,
                    name: messageObject.name,
                    ProductSize: {
                        createMany: {
                            data: messageObject.size.map(item => {
                                return { size_id: item.size_id, price: item.price }
                            })
                        }
                    }
                }
            })

            console.log(result);
        }
    })
}

export async function updateProductConsumer() {
    console.log('UPDATE PIZZA LISTESING');
    const consumer = await kafkaConsumer('update-pizza', 'update-pizza')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as Omit<IProduct, 'id'>
            const result = await prisma.product.update({
                where: {
                    external_id: messageObject.external_id
                },
                data: {
                    description: messageObject.description,
                    name: messageObject.name,
                }
            })

            console.log(result);
        }
    })
}

export async function deleteProductConsumer() {
    console.log('DELETE PIZZA LISTENING');

    const consumer = await kafkaConsumer('delete-pizza', 'delete-pizza')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageObject = JSON.parse(message.value!.toString()) as { external_id: number }
            const result = await prisma.product.delete({
                where: { external_id: messageObject.external_id }
            })

            console.log(result);
        }
    })
}

updateProductConsumer()
createProductConsumer()
deleteProductConsumer()