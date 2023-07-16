import { CreateInput } from "../../../application/models/address.model";
import { jwtPayload } from "../../../application/models/criptography/session/jwt-payload.model";
import { CreateAddressUseCase } from "../../../domain/usecases/address/create-address.usecase";
import { CreateClientUseCase } from "../../../domain/usecases/client/create-client.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class CreateAddressController implements Controller {
    constructor(private readonly createAddress: CreateAddressUseCase, private readonly schema: any) { }

    async handle(req: HttpRequest<{}, jwtPayload, CreateInput>): Promise<HttpResponse> {
        try {
            const result = await this.createAddress.create(req.body, req.user.id, this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            return { data: { error: error.message }, statusCode: 400 }
        }
    }

}