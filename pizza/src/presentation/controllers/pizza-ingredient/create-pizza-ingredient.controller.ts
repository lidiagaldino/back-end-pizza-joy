import { CreatePizzaIngredientInput, CreatePizzaIngredientUseCase } from "../../../domain/usecases/pizza-ingredient/create-pizza-ingredient.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class CreatePizzaIngredientController implements Controller {
    constructor(
        private readonly createPizzaIngredient: CreatePizzaIngredientUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{}, {}, CreatePizzaIngredientInput>): Promise<HttpResponse> {
        try {
            const result = await this.createPizzaIngredient.create(req.body, this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}