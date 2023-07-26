import { FindPizzasSizeUseCase } from "../../../domain/usecases/pizza-size/find-pizzas-size.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class FindPizzaSizeController implements Controller {
    constructor(
        private readonly findPizzaSize: FindPizzasSizeUseCase
    ) { }

    async handle(req: HttpRequest<{ pizza_id: number, size_id: number }>): Promise<HttpResponse> {
        try {
            const result = await this.findPizzaSize.findPizzaSize({ pizza_id: Number(req.params.pizza_id), size_id: Number(req.params.size_id) })
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}