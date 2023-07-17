import { jwtPayload } from "../../../application/models/criptography/session/jwt-payload.model";
import { DeleteClientRepository } from "../../../application/repositories/client/delete-client.repository";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class DeleteClientController implements Controller {
    constructor(private readonly deleteClient: DeleteClientRepository) { }

    async handle(req: HttpRequest<{}, jwtPayload, {}>): Promise<HttpResponse> {
        try {
            await this.deleteClient.delete(Number(req.user.id))
            return { data: {}, statusCode: 204 }
        } catch (error) {
            switch (error.message) {
                case 'NOT_FOUND':
                    return { data: { error: error.message }, statusCode: 404 }
                default:
                    return { data: { error: error.message }, statusCode: 500 }
            }

        }
    }

}