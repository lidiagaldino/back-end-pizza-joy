import { Payment } from "./payment.entity"
import { Product } from "./product.entity"

export type OrderProps = {
    id?: number,
    intent_payment_id: string,
    client_id: number
    deliveryman_id?: number,
    location_id: number,
    product: Product[],
    payment: Payment,
    order_status_id: number
}

export class OrderEntity {
    constructor(
        private props: OrderProps
    ) { }

}