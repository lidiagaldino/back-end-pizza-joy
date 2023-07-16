export interface CreateAddressUseCase {
    create(address: CreateAddressInput, client_id: number, schema: any): Promise<CreateAddressOutput>
}

export type CreateAddressInput = {
    cep: string,
    street: string,
    complement?: string,
    neighborhood: string,
    city: string,
    uf: string,
    number: string,
    lat: number,
    lng: number,
}

export type CreateAddressOutput = {
    id: number,
    cep: string,
    street: string,
    complement?: string,
    neighborhood: string,
    city: string,
    uf: string,
    number: string,
    lat: number,
    lng: number,
}