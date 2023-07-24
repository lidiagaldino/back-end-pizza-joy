import { UpdatePizzaInput, UpdatePizzaUseCase } from "../../../domain/usecases/pizza/update-pizza.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class UpdatePizzaController implements Controller {
    constructor(private readonly updatePizza: UpdatePizzaUseCase, private readonly schema: any) { }

    async handle(req: HttpRequest<{ id: number }, {}, UpdatePizzaInput>): Promise<HttpResponse> {
        try {
            const result = await this.updatePizza.update(req.body, Number(req.params.id), this.schema)
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes) {
                if (error.message.includes('NOT_FOUND')) {
                    return { data: { error: error.message }, statusCode: 404 }
                }
                return { data: { error: error.message }, statusCode: 400 }
            }
        }
    }

}