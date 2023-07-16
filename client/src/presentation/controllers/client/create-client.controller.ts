import { CreateInput } from "../../../application/models/client.model";
import { CreateClientUseCase } from "../../../domain/usecases/client/create-client.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class CreateClientController implements Controller {
    constructor(private readonly createClient: CreateClientUseCase, private readonly schema: any) { }

    async handle(req: HttpRequest<{}, {}, CreateInput>): Promise<HttpResponse> {
        try {
            const result = await this.createClient.create(req.body, this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            return { data: { error: error.message }, statusCode: 400 }
        }
    }

}