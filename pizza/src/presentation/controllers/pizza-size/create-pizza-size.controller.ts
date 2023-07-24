import { create } from "domain";
import { CreatePizzaSizeUseCase, CreatePizzaSizeInput } from "../../../domain/usecases/pizza-size/create-pizza-size.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class CreatePizzaSizeController implements Controller {
    constructor(
        private readonly createPizzaSize: CreatePizzaSizeUseCase,
        private schema: any
    ) { }

    async handle(req: HttpRequest<{}, {}, CreatePizzaSizeInput>): Promise<HttpResponse> {
        try {
            const result = await this.createPizzaSize.create(req.body, this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}