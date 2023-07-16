export interface FindAddressByIdUseCase {
    find(id: FindAddressByIdInput): Promise<FindAddressByIdOutput>
}

export type FindAddressByIdInput = {
    id: number
}

export type FindAddressByIdOutput = {
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