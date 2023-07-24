import { CreateCategoryUseCase } from "../../../domain/usecases/category/create-category.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class CreateCategoryController implements Controller {
    constructor(
        private readonly createCategory: CreateCategoryUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{}, {}, { name: string }>): Promise<HttpResponse> {
        try {
            const result = await this.createCategory.create(req.body, this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            return { data: error.message, statusCode: 400 }
        }
    }
}