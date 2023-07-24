import IAddress from "./Address";

export default interface IClient {
    id: number,
    name: string,
    phone: string,
    email: string,
    password: string,
    address: IAddress
}