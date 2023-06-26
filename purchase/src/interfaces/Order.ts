import IProduct from "./Product";

export default interface IOrder {
    id: number,
    created_at: string,
    finished_at?: string,
    intent_payment_id: string,
    client_id: number,
    product: IProduct[]
}