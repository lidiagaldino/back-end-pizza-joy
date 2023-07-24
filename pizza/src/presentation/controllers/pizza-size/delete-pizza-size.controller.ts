import { DeletePizzaSizeInput, DeletePizzaSizeUseCase } from "../../../domain/usecases/pizza-size/delete-pizza-size.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class DeletePizzaSizeController implements Controller {
    constructor(
        private readonly deletePizzaSize: DeletePizzaSizeUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{}, {}, DeletePizzaSizeInput>): Promise<HttpResponse> {
        try {
            await this.deletePizzaSize.delete(req.body, this.schema)
            return { data: {}, statusCode: 204 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}