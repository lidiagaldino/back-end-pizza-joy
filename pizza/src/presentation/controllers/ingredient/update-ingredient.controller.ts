import { UpdateIngredientInput, UpdateIngredientUseCase } from "../../../domain/usecases/ingredient/update-ingredient.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class UpdateIngredientController implements Controller {
    constructor(
        private readonly updateIngredient: UpdateIngredientUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{ id: number }, {}, UpdateIngredientInput>): Promise<HttpResponse> {
        try {
            const result = await this.updateIngredient.update(req.body, Number(req.params.id), this.schema)
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}