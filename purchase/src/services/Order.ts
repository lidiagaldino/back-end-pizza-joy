import Stripe from "stripe";
import IOrder from "../interfaces/Order";
import prisma from "../lib/db";

class Order {
    async newOrder(order, customer: Stripe.Response<Stripe.Customer>) {
        try {
            const items = JSON.parse(customer.metadata.cart)
            const result = await prisma.order.create({
                data: {
                    client: { connect: { external_id: Number(customer.metadata.userId) } },
                    intent_payment_id: order.payment_intent,
                    ProductOrder: {
                        createMany: {
                            data: items.map(item => {
                                return { product_id: item.id, product_size_id: item.size_id, quantity: item.quantity }
                            })
                        }
                    },
                    payment: {
                        create: {
                            status: true,
                        }
                    }
                }
            })

            console.log(result);

            return result
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getByClientId(client_id: number) {
        const result = await prisma.order.findMany({
            where: {
                client_id
            }
        })

        return result.length > 0 ? result : false
    }

    async getOrdersFilterStatus(ready_for_delivery: boolean, on_way: boolean, finished: boolean) {
        const result = await prisma.order.findMany({
            where: {
                ready_for_delivery,
                on_way,
                finished_at: finished ? { not: null } : null
            }
        })

        console.log(ready_for_delivery);

        return result.length > 0 ? result : false
    }


}

export default new Order()