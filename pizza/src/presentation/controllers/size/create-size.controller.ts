import { CreateSizeInput, CreateSizeUseCase } from "../../../domain/usecases/size/create-size.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class CreateSizeController implements Controller {
    constructor(
        private readonly createSize: CreateSizeUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{}, {}, CreateSizeInput>): Promise<HttpResponse> {
        try {
            const result = await this.createSize.create(req.body, this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            return { data: { error: error.message }, statusCode: 500 }
        }
    }
}