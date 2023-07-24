import { UpdateSizeInput, UpdateSizeUseCase } from "../../../domain/usecases/size/update-size.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class UpdateSizeController implements Controller {
    constructor(
        private readonly updateSize: UpdateSizeUseCase,
        private readonly schema: any
    ) { }

    async handle(req: HttpRequest<{ id: number }, {}, UpdateSizeInput>): Promise<HttpResponse> {
        try {
            const result = await this.updateSize.update(req.body, Number(req.params.id), this.schema)
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: { error: error.message }, statusCode: 400 }
        }
    }
}