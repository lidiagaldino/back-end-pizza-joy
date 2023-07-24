import { DeleteSizeUseCase } from "../../../domain/usecases/size/delete-size.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class DeleteSizeController implements Controller {
    constructor(
        private readonly deleteSize: DeleteSizeUseCase
    ) { }

    async handle(req: HttpRequest<{ id: number }>): Promise<HttpResponse> {
        try {
            await this.deleteSize.delete(Number(req.params.id))
            return { data: {}, statusCode: 204 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 500 }
        }
    }
}