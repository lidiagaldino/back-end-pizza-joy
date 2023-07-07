import ILocation from "./Location";

export default interface IOrder {
    id: number;
    created_at: string;
    finished_at: string;
    client_id: number;
    deliveryman_id: number;
    order_status_id: number;
    location: ILocation;
}