import { GetAllSizesUseCase } from "../../../domain/usecases/size/get-all-sizes.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class GetAllSizesController implements Controller {
    constructor(
        private readonly getAllSizes: GetAllSizesUseCase
    ) { }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.getAllSizes.index()
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 500 }
        }
    }
}