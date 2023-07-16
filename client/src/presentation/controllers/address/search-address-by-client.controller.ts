import { CreateInput } from "../../../application/models/address.model";
import { jwtPayload } from "../../../application/models/criptography/session/jwt-payload.model";
import { CreateAddressUseCase } from "../../../domain/usecases/address/create-address.usecase";
import { FindAddressByIdUseCase } from "../../../domain/usecases/address/find-address-by-id.usecase";
import { SearchAddressByClientUseCase } from "../../../domain/usecases/address/search-address-by-client.usecase";
import { CreateClientUseCase } from "../../../domain/usecases/client/create-client.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class SearchAddressByClientController implements Controller {
    constructor(private readonly searchAddressByClient: SearchAddressByClientUseCase) { }

    async handle(req: HttpRequest<{}, jwtPayload, {}>): Promise<HttpResponse> {
        try {
            const result = await this.searchAddressByClient.search({ id: req.user.id })
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message == 'NOT_FOUND') return { data: { error: error.message }, statusCode: 404 }
            return { data: { error: error.message }, statusCode: 500 }
        }
    }

}