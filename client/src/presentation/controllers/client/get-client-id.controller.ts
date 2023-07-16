import { CreateInput } from "../../../application/models/client.model";
import { jwtPayload } from "../../../application/models/criptography/session/jwt-payload.model";
import { CreateClientUseCase } from "../../../domain/usecases/client/create-client.usecase";
import { GetClientByIdUseCase } from "../../../domain/usecases/client/get-client-id.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class GetClientByIdController implements Controller {
    constructor(private readonly getClientById: GetClientByIdUseCase) { }

    async handle(req: HttpRequest<{}, jwtPayload, {}>): Promise<HttpResponse> {
        try {
            const result = await this.getClientById.find({ id: req.user.id })
            return { data: result, statusCode: 200 }
        } catch (error) {
            switch (error.message) {
                case 'not_found':
                    return { data: JSON.parse(error.message), statusCode: 404 }
                default:
                    return { data: { error: error.message }, statusCode: 400 }
            }

        }
    }

}