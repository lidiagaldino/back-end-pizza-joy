import { GetOrderByIdOutput } from "../../domain/usecases/get-order-by-id.usecase"
import { FindOrderByClientOutput } from "../../domain/usecases/get-orders-by-client.usecase"
import { UpdateOrderStatusInput, UpdateOrderStatusOutput } from "../../domain/usecases/update-order-status.usecase"

export type CreateInput = {
    intent_payment_id: string,
    client_id: number
    product: { id: number, size_id: number, quantity: number }[],
    location: { lat: number, lng: number, complement: string }
}

export type CreateOutput = {
    id: number,
    intent_payment_id: string,
    client_id: number
    deliveryman_id?: number,
    product: { id: number, size_id: number, quantity: number }[],
    order_status_id: number,
    location: { id: number, lat: number, lng: number, complement: string },
    created_at: string,
    finished_at: string,

}

export type FindByClientInput = number
export type FindByClientOutput = FindOrderByClientOutput

export type UpdateStatusInput = UpdateOrderStatusInput
export type UpdateStatusOutput = UpdateOrderStatusOutput

export type FindOrderByIdInput = number
export type FindOrderByIdOutput = GetOrderByIdOutput