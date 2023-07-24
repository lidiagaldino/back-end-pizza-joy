import IPizza from "../../../interfaces/Pizza";
import prisma from "../../db/prisma";
import { kafkaConsumer } from "../kafkaConsumer";

export async function createPizzaConsumer() {
    console.log('consumer');
    const pizza = await kafkaConsumer("pizza_created")

    await pizza.run({
        eachMessage: async ({ message }) => {
            const messageString = JSON.parse(message.value?.toString()) as unknown as IPizza
            console.log(messageString);

            await prisma.pizza.create({
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
                }
            })

        }
    })
}

createPizzaConsumer()