import { GetAllCategoriesUseCase } from "../../../domain/usecases/category/get-all-categories.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class GetAllCategoriesController implements Controller {
    constructor(
        private readonly getAllCategories: GetAllCategoriesUseCase
    ) { }

    async handle(_req: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.getAllCategories.show()
            return { data: result, statusCode: 200 }
        } catch (error) {
            return {
                data: { error: error.message }, statusCode: 404
            }
        }
    }
}