import { CreateInput } from "../../../application/models/address.model";
import { jwtPayload } from "../../../application/models/criptography/session/jwt-payload.model";
import { CreateAddressUseCase } from "../../../domain/usecases/address/create-address.usecase";
import { FindAddressByIdUseCase } from "../../../domain/usecases/address/find-address-by-id.usecase";
import { CreateClientUseCase } from "../../../domain/usecases/client/create-client.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class FindAddressByIdController implements Controller {
    constructor(private readonly findAddressById: FindAddressByIdUseCase) { }

    async handle(req: HttpRequest<{ id: number }, {}, {}>): Promise<HttpResponse> {
        try {
            const result = await this.findAddressById.find({ id: Number(req.params.id) })
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message == 'NOT_FOUND') return { data: { error: error.message }, statusCode: 404 }
            return { data: { error: error.message }, statusCode: 500 }
        }
    }

}