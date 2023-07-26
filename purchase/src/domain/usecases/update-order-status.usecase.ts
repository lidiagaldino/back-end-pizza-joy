export interface UpdateOrderStatusUseCase {
    updateOrderStatus(data: UpdateOrderStatusInput, schema: any): Promise<UpdateOrderStatusOutput>
}

export type UpdateOrderStatusInput = {
    order_id: number,
    status_id: number
}

export type UpdateOrderStatusOutput = {
    id: number,
    created_at: string,
    finished_at: string,
    intent_payment_id: string,
    client_id: number,
    deliveryman_id?: number,
    order_status_id: number,
    location_id: number
}