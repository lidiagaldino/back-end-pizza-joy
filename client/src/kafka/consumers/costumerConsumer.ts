import IPizza from "../../interfaces/Pizza";
import prisma from "../../lib/db";
import { kafkaConsumer } from "./kafkaConsumer";

export async function createConsumer() {
    console.log('custumer consumer');
    const consumer = await kafkaConsumer("pizza_created")

    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageString = JSON.stringify(message.value?.toString()) as unknown as IPizza
            console.log(messageString);

            const result = await prisma.pizza.create({
                data: {
                    id: messageString.id,
                    description: messageString.description,
                    name: messageString.name,
                    ingredient: {
                        createMany: {
                            data: messageString.ingredient.map(item => { return { ingredient_id: item.ingredient_id } })
                        }
                    },
                    pizza_size: {
                        createMany: {
                            data: messageString.size.map(item => { return { size_id: item.size_id, price: item.price } })
                        }
                    }
                },
            })

            console.log(result);
        }
    })
}

createConsumer()