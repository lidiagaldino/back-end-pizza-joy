import { jwtPayload } from "../../../application/models/criptography/session/jwt-payload.model";
import { DeleteAddressUseCase } from "../../../domain/usecases/address/delete-address.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class DeleteAddressController implements Controller {
    constructor(private readonly deleteAddress: DeleteAddressUseCase) { }

    async handle(req: HttpRequest<{ id: number }, jwtPayload, {}>): Promise<HttpResponse> {
        try {
            await this.deleteAddress.delete(Number(req.params.id))
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