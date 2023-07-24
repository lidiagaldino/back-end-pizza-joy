import { GetALlIngredientsUseCase } from "../../../domain/usecases/ingredient/get-all-ingredients.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class GetAllIngredientsController implements Controller {
    constructor(
        private readonly getAllIngredients: GetALlIngredientsUseCase
    ) { }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.getAllIngredients.index()
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}