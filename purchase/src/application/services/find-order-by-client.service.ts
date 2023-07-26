import { FindOrderByClientOutput, GetOrderByClient } from "../../domain/usecases/get-orders-by-client.usecase";
import { FindOrderByClientRepository } from "../repositories/find-order-by-client.repository";

export class FindOrderByClient implements GetOrderByClient {
    constructor(
        private readonly findOrderByClientRepository: FindOrderByClientRepository
    ) { }

    async getByClient(id: number): Promise<FindOrderByClientOutput> {
        const result = await this.findOrderByClientRepository.findByClient(id)
        if (!result) throw new Error('NOT_FOUND')

        return result
    }
}