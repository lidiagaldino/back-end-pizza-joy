import { searchByClientInput, searchByClientOutput } from "../../models/address.model";

export interface SearchByClientAddressRepository {
    search(id: searchByClientInput): Promise<searchByClientOutput>
}