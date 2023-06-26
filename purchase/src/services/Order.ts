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

    async confirmPayment(payment: string, ok: boolean) {
        try {
            const result = await prisma.order.update({
                where: {
                    intent_payment_id: payment
                },
                data: {
                    payment: {
                        update: {
                            status: ok
                        }
                    }
                }
            })

            return result
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

export default new Order()