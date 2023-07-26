import { CreateOrder } from "../../../application/services/create-order.service"
import { KafkaSendMessage } from "../../../infra/kafka/KafkaSendMessage"
import { OrderRepository } from "../../../infra/repositories/order.repository"
import { StripeAdapter } from "../../../infra/stripe/stripe.adapter"
import { ConfirmPaymentController } from "../../../presentation/controllers/payments/confirm-payment.controller"

export const makeConfirmPaymentController = () => {
    const repository = new OrderRepository()
    const handlePaymentEvent = new StripeAdapter()
    const eventSender = new KafkaSendMessage()
    const loader = new CreateOrder(handlePaymentEvent, repository, eventSender)
    return new ConfirmPaymentController(loader)
}