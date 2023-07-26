import { CreateInput, CreateOutput } from "../model/order.model";

export interface CreateOrderRepository {
    create(order: CreateInput): Promise<CreateOutput>
}