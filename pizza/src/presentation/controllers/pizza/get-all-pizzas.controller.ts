import { GetAllPizzasUseCase } from "../../../domain/usecases/pizza/get-all-pizzas.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class GetAllPizzasController implements Controller {
    constructor(private readonly getAllPizzas: GetAllPizzasUseCase) { }

    async handle(_req: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.getAllPizzas.index()
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.contais('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: error.message, statusCode: 500 }
        }
    }
}