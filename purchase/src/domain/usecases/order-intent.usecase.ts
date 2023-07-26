export interface OrderIntentUseCase {
    make(order: OrderIntentInput, schema: any): Promise<OrderIntentOutput>
}

export type OrderIntentInput = {
    product_id: { id: number, size_id: number, quantity: number }[]
    location: { lat: number, lng: number, complement: string },
    user_id: number
}

export type OrderIntentOutput = {
    url: string
}