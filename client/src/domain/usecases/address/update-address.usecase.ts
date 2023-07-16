export interface UpdateAddressUseCase {
    update(address: UpdateAddressInput, id: number, schema: any): Promise<UpdateAddressOutput>
}

export type UpdateAddressInput = {
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

export type UpdateAddressOutput = {
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