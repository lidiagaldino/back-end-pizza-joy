import { Request, Response } from "express"
import IOrder from "../interfaces/Order"

import Stripe from 'stripe'
import Order from "../services/Order";
import { StatusCodes } from "http-status-codes";
import { randomUUID } from "crypto";
const stripe = new Stripe(
    'sk_test_51NMxfzAexAhNumd0pGODylKF0bApcL7lbabTLRnHruGNJ7ZwQew02kqBG2dtanxNGxIxOmn9mj3WQAd7WTgXkYh600XxMvaz4a',
    {
        apiVersion: '2022-11-15',
        typescript: true,
    }
);
const endpointSecret = "whsec_5c11e7fac6caa8d21e7042718eb42f229a914c4b7f32da093cd3225687e8322a";

class StripeController {
    async createIntent(req: Request<{}, {}, Omit<IOrder, 'id' | 'intent_payment_id'>>, res: Response) {
        const bodyOrder = req.body
        const customer = await stripe.customers.create({
            metadata: {
                userId: req.body.client_id,
                cart: JSON.stringify(req.body.product)
            }
        })
        const line_items = req.body.product.map(item => {
            return {
                price_data: {
                    currency: "brl",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            payment_method_types: ['card'],
            metadata: {
                session_id: randomUUID()
            },
            customer: customer.id,
            success_url: `https://localhost:3000?success=true`,
            cancel_url: `https://localhost:4000?canceled=true`,
        })

        // if (typeof session.payment_intent != 'string') {
        //     return res.status(StatusCodes.BAD_GATEWAY).json({ error: 'error on payment intent' })
        // }
        console.log(session);
        const saveOrder = await Order.newOrder({ ...bodyOrder, intent_payment_id: session.id })

        return saveOrder ? res.status(StatusCodes.CREATED).json({ url: session.url }) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async confirmPayment(req: Request, res: Response) {
        const sig = req.headers['stripe-signature'];

        console.log('STRIPE EVENT IS ON');

        let event = req.body;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        const paymentIntentSucceeded = event.data.object

        // Handle the event
        switch (event.type) {
            case 'checkout.session.expired':
                const paymentIntentCanceled = event.data.object;
                console.log('object');

                await Order.confirmPayment(paymentIntentCanceled.id, false)
                break;
            case 'checkout.session.completed':

                console.log('success');

                await Order.confirmPayment(paymentIntentSucceeded.id, true)
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        res.send({ recieved: true });
    }
}

export default new StripeController()