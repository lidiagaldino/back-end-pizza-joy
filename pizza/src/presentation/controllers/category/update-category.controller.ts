import { UpdateCategoryInput, UpdateCategoryUseCase } from "../../../domain/usecases/category/update-category.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class UpdateCategoryController implements Controller {
    constructor(
        private readonly updateCategory: UpdateCategoryUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{ id: number }, {}, UpdateCategoryInput>): Promise<HttpResponse> {
        try {
            const result = await this.updateCategory.update(req.body, Number(req.params.id), this.schema)
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}