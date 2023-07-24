import { DeleteCategoryUseCase } from "../../../domain/usecases/category/delete-category.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class DeleteCategoryController implements Controller {
    constructor(
        private readonly deleteCategoy: DeleteCategoryUseCase
    ) { }

    async handle(req: HttpRequest<{ id: number }>): Promise<HttpResponse> {
        try {
            await this.deleteCategoy.delete(Number(req.params.id))
            return { data: {}, statusCode: 204 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 500 }
        }
    }
}