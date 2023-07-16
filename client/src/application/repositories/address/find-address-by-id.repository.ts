import { findByIdInput, findByIdOutput } from "../../models/address.model";

export interface FindByIdAddressRepository {
    find(id: findByIdInput): Promise<findByIdOutput>
}