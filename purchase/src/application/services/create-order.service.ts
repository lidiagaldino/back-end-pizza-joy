import { SendEvents } from "../../domain/events/send-event";
import { CreateOrderUseCase } from "../../domain/usecases/create-order.usecase";
import { HandlePayment } from "../model/payment/handle-payment.model";
import { CreateOrderRepository } from "../repositories/create-order.repository";

export class CreateOrder implements CreateOrderUseCase {
    constructor(
        private readonly handleStripeEvent: HandlePayment,
        private readonly createOrderRepository: CreateOrderRepository,
        private readonly sendEvents: SendEvents
    ) { }

    async create(order: any, sig: string): Promise<{ recieved: boolean; }> {
        const event = await this.handleStripeEvent.handle(order, sig)
        console.log(event);

        const result = await this.createOrderRepository.create({
            client_id: Number(event.customer.metadata.userId),
            intent_payment_id: event.paymentIntentSucceeded.payment_intent,
            location: JSON.parse(event.customer.metadata.location),
            product: JSON.parse(event.customer.metadata.cart),
        })


        await this.sendEvents.execute('new-order', {
            id: result.id,
            created_at: result.created_at,
            finished_at: result.finished_at,
            client_id: result.client_id,
            deliveryman_id: result.deliveryman_id,
            order_status_id: result.order_status_id,
            location: { lat: result.location.lat, lng: result.location.lng, complement: result.location.complement },
        })

        return { recieved: true }
    }
}