import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { AuthenticationUseCase } from "../../domain/usecases/authentication.use-case";
import { AuthenticationAdminInput } from "../../application/models/admin.model";


export class LoginController implements Controller {
    constructor(private readonly authentication: AuthenticationUseCase) { }

    async handle(req: HttpRequest<{}, {}, AuthenticationAdminInput>): Promise<HttpResponse> {
        try {
            const result = await this.authentication.auth(req.body)
            return { data: result, statusCode: 201 }
        } catch (error) {
            switch (error.message) {
                case 'UNAUTHORIZED':
                    return { data: error.message, statusCode: 401 }
                default:
                    return { data: JSON.parse(error.message), statusCode: 400 }
            }

        }

    }
}
