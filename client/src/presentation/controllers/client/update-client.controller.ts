import { CreateInput } from "../../../application/models/client.model";
import { jwtPayload } from "../../../application/models/criptography/session/jwt-payload.model";
import { CreateClientUseCase } from "../../../domain/usecases/client/create-client.usecase";
import { UpdateClientUseCase } from "../../../domain/usecases/client/update-client.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class UpdateClientController implements Controller {
    constructor(private readonly updateClient: UpdateClientUseCase, private readonly schema: any) { }

    async handle(req: HttpRequest<{}, jwtPayload, CreateInput>): Promise<HttpResponse> {
        try {
            const result = await this.updateClient.update(req.body, req.user.id, this.schema)
            return { data: result, statusCode: 200 }
        } catch (error) {
            return { data: { error: error.message }, statusCode: 400 }
        }
    }

}