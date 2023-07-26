import Stripe from "stripe";
import { HandlePayment } from "../../application/model/payment/handle-payment.model";
import { Payment } from "../../application/model/payment/payment.model";
import dotenv from 'dotenv'

export class StripeAdapter implements HandlePayment, Payment {
    private readonly stripe: Stripe

    constructor() {
        dotenv.config()
        this.stripe = new Stripe(
            process.env.STRIPE_API_KEY,
            {
                apiVersion: '2022-11-15',
                typescript: true,
            }
        )
    }

    async handle(event: any, sig: string): Promise<{ paymentIntentSucceeded: any, customer: any }> {

        event = this.stripe.webhooks.constructEvent(event, sig, process.env.STRIPE_ENDPOINT_SECRET);
        console.log(event.type);
        switch (event.type) {
            case 'checkout.session.completed':
                const paymentIntentSucceeded = event.data.object
                const data = this.stripe.customers.retrieve(paymentIntentSucceeded.customer).then(async (customer) => {

                    if (typeof customer.deleted != 'boolean') {
                        return { paymentIntentSucceeded, customer }
                    }
                })
                console.log('success');
                return data
            default:
                throw new Error('UNHANDLE')
        }


    }

    async makePayment(data: { user_id: number; products: { id: number; name: string; image: string; price: number; quantity: number; }[]; location: { lat: number; lng: number; complement: string; }; }): Promise<{ url: string; }> {
        const customer = await this.stripe.customers.create({
            metadata: {
                userId: data.user_id,
                location: JSON.stringify(data.location),
                cart: JSON.stringify(data.products)
            }
        })

        const line_items = data.products.map(item => {
            return {
                price_data: {
                    currency: "brl",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: Number(item.price.toFixed(2)) * 100,
                },
                quantity: item.quantity,
            }
        })

        const session = await this.stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            payment_method_types: ['card'],
            customer: customer.id,
            success_url: `https://localhost:3000?success=true`,
            cancel_url: `https://localhost:4000?canceled=true`,
        })

        return { url: session.url }
    }
}