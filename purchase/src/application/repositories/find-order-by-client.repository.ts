import { FindByClientInput, FindByClientOutput } from "../model/order.model";

export interface FindOrderByClientRepository {
    findByClient(id: FindByClientInput): Promise<FindByClientOutput>
}