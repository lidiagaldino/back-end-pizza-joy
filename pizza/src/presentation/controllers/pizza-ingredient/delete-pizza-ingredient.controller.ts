import { DeletePizzaIngredientInput, DeletePizzaIngredientUseCase } from "../../../domain/usecases/pizza-ingredient/delete-pizza-ingredient.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class DeletePizzaIngredientController implements Controller {
    constructor(
        private readonly deletePizzaIngredient: DeletePizzaIngredientUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{}, {}, DeletePizzaIngredientInput>): Promise<HttpResponse> {
        try {
            console.log('ola');
            await this.deletePizzaIngredient.delete(req.body, this.schema)
            return { data: {}, statusCode: 204 }
        } catch (error) {
            console.log(error);
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}