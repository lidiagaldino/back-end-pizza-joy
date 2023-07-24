import { get } from "http";
import { GetPizzaByIdUseCase } from "../../../domain/usecases/pizza/get-pizza-by-id.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class GetPizzaByIdController implements Controller {
    constructor(private readonly getPizzaById: GetPizzaByIdUseCase) { }

    async handle(req: HttpRequest<{ id: number }, {}, {}>): Promise<HttpResponse> {
        try {
            const result = await this.getPizzaById.find(Number(req.params.id))
            return { data: result, statusCode: 200 }
        } catch (error) {
            return { data: { error: error.message }, statusCode: 404 }
        }
    }
}