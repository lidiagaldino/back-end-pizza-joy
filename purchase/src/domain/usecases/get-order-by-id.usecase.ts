export interface GetOrderByIdUseCase {
    find(id: number): Promise<GetOrderByIdOutput>
}

export type GetOrderByIdOutput = {
    id: number,
    created_at: string,
    finished_at: string,
    intent_payment_id: string,
    client_id: number,
    deliveryman_id?: number,
    order_status_id: number,
    location_id: number
}