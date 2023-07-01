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
                    order_status: { connect: { id: 1 } },
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
                    },
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

    async getOrdersFilterStatus(order_status_id: number) {
        const result = await prisma.order.findMany({
            where: {
                order_status_id
            }
        })

        return result.length > 0 ? result : false
    }

    async updateOrderStatus(order_status_id: number, id: number) {
        try {
            const result = await prisma.order.update({
                where: {
                    id
                },
                data: {
                    order_status: { connect: { id: order_status_id } },
                    finished_at: order_status_id == 4 ? new Date() : null
                }
            })

            return result
        } catch (error) {
            return false
        }
    }
}

export default new Order()