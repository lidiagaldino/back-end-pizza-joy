import { GetSizesByIdUseCase } from "../../../domain/usecases/size/find-sizes-by-id.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class FindSizeByIdController implements Controller {
    constructor(
        private readonly findSizeById: GetSizesByIdUseCase
    ) { }

    async handle(req: HttpRequest<{ id: number }>): Promise<HttpResponse> {
        try {
            const result = await this.findSizeById.show(Number(req.params.id))
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 500 }
        }
    }
}