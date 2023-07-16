import { CreateAddressInput, CreateAddressOutput } from "../../domain/usecases/address/create-address.usecase";
import { FindAddressByIdInput, FindAddressByIdOutput } from "../../domain/usecases/address/find-address-by-id.usecase";
import { SearchAddressByClientInput, SearchAddressByClientOutput } from "../../domain/usecases/address/search-address-by-client.usecase";
import { UpdateAddressInput, UpdateAddressOutput } from "../../domain/usecases/address/update-address.usecase";

export type CreateInput = CreateAddressInput
export type CreateOutput = CreateAddressOutput

export type UpdateInput = UpdateAddressInput
export type UpdateOutput = UpdateAddressOutput

export type findByIdInput = FindAddressByIdInput
export type findByIdOutput = FindAddressByIdOutput

export type searchByClientInput = SearchAddressByClientInput
export type searchByClientOutput = SearchAddressByClientOutput