export interface SearchAddressByClientUseCase {
    search(id: SearchAddressByClientInput): Promise<SearchAddressByClientOutput>
}

export type SearchAddressByClientInput = {
    id: number
}

export type SearchAddressByClientOutput = {
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
}[]