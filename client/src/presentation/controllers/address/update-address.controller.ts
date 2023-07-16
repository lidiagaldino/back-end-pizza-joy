import { UpdateInput } from "../../../application/models/address.model";
import { jwtPayload } from "../../../application/models/criptography/session/jwt-payload.model";
import { UpdateAddressUseCase } from "../../../domain/usecases/address/update-address.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class UpdateAddressController implements Controller {
    constructor(private readonly updateAddress: UpdateAddressUseCase, private readonly schema: any) { }

    async handle(req: HttpRequest<{ id: number }, {}, UpdateInput>): Promise<HttpResponse> {
        try {
            const result = await this.updateAddress.update(req.body, Number(req.params.id), this.schema)
            return { data: result, statusCode: 201 }
        } catch (error) {
            return { data: { error: error.message }, statusCode: 400 }
        }
    }

}