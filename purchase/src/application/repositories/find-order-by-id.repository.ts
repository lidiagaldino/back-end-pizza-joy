import { FindOrderByIdInput, FindOrderByIdOutput } from "../model/order.model";

export interface FindOrderByIdRepository {
    find(id: FindOrderByIdInput): Promise<FindOrderByIdOutput>
}