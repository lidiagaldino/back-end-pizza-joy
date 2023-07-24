import { CreatePizzaInput, CreatePizzaUseCase } from "../../../domain/usecases/pizza/create-pizza.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class CreatePizzaController implements Controller {
    constructor(private readonly createPizza: CreatePizzaUseCase, private readonly schema: any) { }

    async handle(req: HttpRequest<{}, {}, CreatePizzaInput>): Promise<HttpResponse> {
        try {
            const result = await this.createPizza.create(req.body, this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}