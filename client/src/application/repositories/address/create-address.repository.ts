import { CreateInput, CreateOutput } from "../../models/address.model";

export interface CreateAddressRepository {
    insert(address: CreateInput, id: number): Promise<CreateOutput>
}