import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { CreateAdminInput, CreateAdminUseCase } from "../../domain/usecases/create-admin.use-case";
import { AdminDataUseCase } from "../../domain/usecases/get-admin-data.use-case";


export class GetAdminDataController implements Controller {
    constructor(private readonly adminData: AdminDataUseCase) { }

    async handle(req: HttpRequest<{ id: number }, {}, {}>): Promise<HttpResponse> {
        try {
            const result = await this.adminData.getById(Number(req.params.id))
            return { data: result, statusCode: 201 }
        } catch (error) {
            return { data: error.message, statusCode: 400 }
        }

    }
}
