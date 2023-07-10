import { NumberSchema } from "yup";

export default interface IRide {
    id: number,
    client_id: number,
    deliveryman_id: number,
    lat: number,
    lng: number
}