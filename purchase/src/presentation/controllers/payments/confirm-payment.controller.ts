import { CreateOrder } from "../../../application/services/create-order.service";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class ConfirmPaymentController implements Controller {
    constructor(
        private readonly confirmPayment: CreateOrder
    ) { }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.confirmPayment.create(req.body, req.headers['stripe-signature'])

            return { data: result, statusCode: 200 }
        } catch (error) {
            console.log(error);
            return { data: { recieved: true }, statusCode: 200 }
        }

    }
}