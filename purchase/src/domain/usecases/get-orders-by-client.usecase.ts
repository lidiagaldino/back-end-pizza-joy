export interface GetOrderByClient {
    getByClient(id: number): Promise<FindOrderByClientOutput>
}

export type FindOrderByClientOutput = {
    id: number,
    intent_payment_id: string,
    client_id: number
    deliveryman_id?: number,
    product: { id: number, size_id: number, quantity: number }[],
    order_status_id: number,
    location: { id: number, lat: number, lng: number, complement: string },
    created_at: string,
    finished_at: string,

}[]