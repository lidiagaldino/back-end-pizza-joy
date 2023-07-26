import { UpdateOrderStatusUseCase } from "../../../domain/usecases/update-order-status.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class UpdateOrderStatusController implements Controller {
    constructor(
        private readonly updateOrderStatus: UpdateOrderStatusUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{ id: number }, {}, { status_id: number }>): Promise<HttpResponse> {
        try {
            const result = await this.updateOrderStatus.updateOrderStatus({ order_id: Number(req.params.id), status_id: req.body.status_id }, this.schema)
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: error.message, statusCode: 400 }
        }
    }
}