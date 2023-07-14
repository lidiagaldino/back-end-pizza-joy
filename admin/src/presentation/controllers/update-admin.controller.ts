import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { UpdateAdminUseCase } from "../../domain/usecases/update-admin.use-case";
import { UpdateAdminInput } from "../../application/models/admin.model";
import { jwtPayload } from "../../application/models/criptography.model";


export class UpdateAdminController implements Controller {
    constructor(private readonly updateAdmin: UpdateAdminUseCase, private readonly schema: any) { }

    async handle(req: HttpRequest<{ id: number }, jwtPayload, UpdateAdminInput>): Promise<HttpResponse> {
        try {
            const result = await this.updateAdmin.update(req.body, req.user.id, this.schema)
            return { data: result, statusCode: 200 }
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
