import { OrderIntentInput, OrderIntentUseCase } from "../../../domain/usecases/order-intent.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class CreateIntentController implements Controller {
    constructor(
        private readonly createIntent: OrderIntentUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{}, { id: number }, OrderIntentInput>): Promise<HttpResponse> {
        try {
            const result = await this.createIntent.make({
                location: req.body.location, product_id: req.body.product_id, user_id: req.user.id
            }, this.schema)

            return { data: result, statusCode: 200 }
        } catch (error) {
            return { data: error.message, statusCode: 200 }
        }
    }
} 