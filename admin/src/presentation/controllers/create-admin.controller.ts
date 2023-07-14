import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { CreateAdminInput, CreateAdminUseCase } from "../../domain/usecases/create-admin.use-case";


export class AdminController implements Controller {
    constructor(private readonly createAdmin: CreateAdminUseCase, private readonly schema: any) { }

    async handle(req: HttpRequest<{}, {}, CreateAdminInput>): Promise<HttpResponse> {
        try {
            const result = await this.createAdmin.create(req.body, this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            return { data: JSON.parse(error.message), statusCode: 400 }
        }

    }
}
