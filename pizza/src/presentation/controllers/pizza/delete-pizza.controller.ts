import { DeletePizzaUseCase } from "../../../domain/usecases/pizza/delete-pizza.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class DeletePizzaController implements Controller {
    constructor(
        private readonly deletePizza: DeletePizzaUseCase
    ) { }

    async handle(req: HttpRequest<{ id: number }, {}, {}>): Promise<HttpResponse> {
        try {
            await this.deletePizza.delete(Number(req.params.id))
            return { data: {}, statusCode: 204 }
        } catch (error) {
            if (error.message.includes("NOT_FOUND")) {
                return { data: { error: error.message }, statusCode: 404 }
            }

            return { data: { error: error.message }, statusCode: 500 }
        }
    }
}