import { FindPizzaBySizeUseCase } from "../../../domain/usecases/pizza-size/find-pizza-by-size.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class FindPizzaBySizeController implements Controller {
    constructor(
        private readonly findPizzaBySize: FindPizzaBySizeUseCase
    ) { }

    async handle(req: HttpRequest<{ id: number }, {}, {}>): Promise<HttpResponse> {
        try {
            const result = await this.findPizzaBySize.findBySize(Number(req.params.id))
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}