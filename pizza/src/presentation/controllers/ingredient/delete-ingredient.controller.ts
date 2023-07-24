import { DeleteIngredientUseCase } from "../../../domain/usecases/ingredient/delete-ingredient.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class DeleteIngredientController implements Controller {
    constructor(
        private readonly deleteIngredient: DeleteIngredientUseCase
    ) { }

    async handle(req: HttpRequest<{ id: number }>): Promise<HttpResponse> {
        try {
            await this.deleteIngredient.delete(Number(req.params.id))

            return { data: {}, statusCode: 204 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}