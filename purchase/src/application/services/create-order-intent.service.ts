import { OrderIntentInput, OrderIntentOutput, OrderIntentUseCase } from "../../domain/usecases/order-intent.usecase";
import { Intent } from "../model/intent.model";
import { Payment } from "../model/payment/payment.model";
import { Validation } from "../model/validate.model";
import { VerifyIfPizzaSizeExistsRepository } from "../repositories/verify-pizza-size.repository";

export class CreateOrderIntent implements OrderIntentUseCase {
    constructor(
        private readonly payment: Payment,
        private readonly verifyPizzaSizeRepository: VerifyIfPizzaSizeExistsRepository,
        private readonly validation: Validation
    ) { }

    async make(order: OrderIntentInput, schema: any): Promise<OrderIntentOutput> {
        this.validation.validate(schema, order)

        const verify = await this.verifyPizzaSizeRepository.findPizzaSize(order.product_id.map(item => { return { pizza_id: item.id, size_id: item.size_id } }))
        if (!verify) throw new Error('PRODUCT_NOT_FOUND')
        console.log(verify);

        const withQuantity = verify.map(item => {
            console.log(item);
            return {
                ...item,
                quantity: order.product_id.find(product => product.id === item.id).quantity
            }
        })

        const pay = await this.payment.makePayment({
            location: order.location,
            products: withQuantity,
            user_id: order.user_id
        })

        return { url: pay.url }

    }
}