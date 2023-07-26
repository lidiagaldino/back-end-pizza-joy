import { CreateOrderIntent } from "../../../application/services/create-order-intent.service"
import { PizzaSizeRepository } from "../../../infra/repositories/pizza-size.repository"
import { StripeAdapter } from "../../../infra/stripe/stripe.adapter"
import { YupAdapter } from "../../../infra/yup/yup.adaper"
import { CreateIntentController } from "../../../presentation/controllers/payments/create-intent.controller"

export const makeCreatePaymenteIntentController = (schema: any) => {
    const pay = new StripeAdapter()
    const verifyRepository = new PizzaSizeRepository()
    const validation = new YupAdapter()
    const loader = new CreateOrderIntent(pay, verifyRepository, validation)
    return new CreateIntentController(loader, schema)
}