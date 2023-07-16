import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";
import { LoginClientUseCase } from "../../../domain/usecases/client/login-client.usecase";
import { LoginInput } from "../../../application/models/client.model";


export class LoginController implements Controller {
    constructor(private readonly authentication: LoginClientUseCase, private readonly schema: any) { }

    async handle(req: HttpRequest<{}, {}, LoginInput>): Promise<HttpResponse> {
        try {
            const result = await this.authentication.login(req.body, this.schema)
            return { data: result, statusCode: 200 }
        } catch (error) {
            switch (error.message) {
                case 'unauthorized':
                    return { data: { error: error.message }, statusCode: 401 }
                default:
                    return { data: JSON.parse(error.message), statusCode: 400 }
            }

        }

    }
}
