import { jwtPayload } from "../../../application/model/criptography/session/jwt-payload.model";
import { GetOrderByClient } from "../../../domain/usecases/get-orders-by-client.usecase";
import { Controller } from "../../contracts/controller.contract";
import { HttpRequest, HttpResponse } from "../../contracts/http.contract";

export class FindOrderByClientController implements Controller {
    constructor(
        private readonly findOrderByClient: GetOrderByClient
    ) { }

    async handle(req: HttpRequest<{}, jwtPayload>): Promise<HttpResponse> {
        try {
            const result = await this.findOrderByClient.getByClient(req.user.id)
            return { data: result, statusCode: 200 }
        } catch (error) {
            if (error.message.includes('NOT_FOUND')) {
                return { data: { error: error.message }, statusCode: 404 }
            }
            return { data: error.message, statusCode: 500 }
        }
    }
}