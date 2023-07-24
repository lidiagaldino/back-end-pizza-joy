import { CreateIngredientInput, CreateIngredientUseCase } from "../../../domain/usecases/ingredient/create-ingredient.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class CreateIngredientController implements Controller {
    constructor(
        private readonly createIngredient: CreateIngredientUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{}, {}, CreateIngredientInput>): Promise<HttpResponse> {
        try {
            const result = await this.createIngredient.create(req.body, this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            return { data: { error: error.message }, statusCode: 500 }
        }
    }
}