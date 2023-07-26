import { UpdateStatusInput, UpdateStatusOutput } from "../model/order.model";

export interface UpdateOrderSstatusRepository {
    updateStatus(data: UpdateStatusInput): Promise<UpdateStatusOutput>
}