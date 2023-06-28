import { Request, Response } from "express"
import IOrder from "../interfaces/Order"

import Stripe from 'stripe'
import Order from "../services/Order";
import { StatusCodes } from "http-status-codes";

import Product from "../services/Product";
import IOrderStatus from "../interfaces/OrderStatus";

const stripe = new Stripe(
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2022-11-15',
        typescript: true,
    }
);

class StripeController {
    async createIntent(req: Request<{}, {}, Omit<IOrder, 'id' | 'intent_payment_id'>>, res: Response) {
        const bodyOrder = req.body
        const productsData = await Product.getProductData(bodyOrder.product_id.map(item => item.id))

        if (!productsData) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'some of the requested products were not found or are repeated' })
        }
        const customer = await stripe.customers.create({
            metadata: {
                userId: req.user.id,
                cart: JSON.stringify(productsData.map(item => {
                    return {
                        ...item,
                        quantity: bodyOrder.product_id.find(product => product.id === item.product_size_id).quantity
                    }
                }))
            }
        })



        const line_items = productsData.map(item => {
            return {
                price_data: {
                    currency: "brl",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: bodyOrder.product_id.find(product => product.id === item.product_size_id).quantity,
            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            payment_method_types: ['card'],
            customer: customer.id,
            success_url: `https://localhost:3000?success=true`,
            cancel_url: `https://localhost:4000?canceled=true`,
        })

        return res.status(StatusCodes.OK).json({ url: session.url })
    }

    async confirmPayment(req: Request, res: Response) {
        const sig = req.headers['stripe-signature'];

        console.log('STRIPE EVENT IS ON');

        let event = req.body;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        switch (event.type) {
            case 'checkout.session.completed':
                const paymentIntentSucceeded = event.data.object
                stripe.customers.retrieve(paymentIntentSucceeded.customer).then(async (customer) => {
                    try {
                        if (typeof customer.deleted != 'boolean') {
                            await Order.newOrder(paymentIntentSucceeded, customer)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })
                console.log('success');
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.send({ recieved: true });
    }

    async getByClient(req: Request, res: Response) {
        const { id } = req.user

        const result = await Order.getByClientId(id)

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async getOrderByStatus(req: Request<{}, {}, IOrderStatus>, res: Response) {
        const { ready_for_delivery, on_way, finished } = req.query
        console.log(ready_for_delivery);
        const result = await Order.getOrdersFilterStatus(Boolean(ready_for_delivery == 'true'), Boolean(on_way == 'true'), Boolean(finished == 'true'))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }
}

export default new StripeController()