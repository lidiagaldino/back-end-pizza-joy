import IProduct from "./Product";

export default interface IOrder {
    id: number,
    created_at: string,
    finished_at?: string,
    intent_payment_id: string,
    client_id: number,
    product_id: {
        id: number,
        quantity: number
    }[],
    location: { lat: number, lng: number, complement?: string }
}