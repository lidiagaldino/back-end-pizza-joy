export interface CreateClientUseCase {
    create(client: CreateClientInput, schema: any): Promise<CreateClientOutput>
}

export type CreateClientInput = {
    name: string,
    phone: string,
    email: string,
    password: string
}

export type CreateClientOutput = {
    id: number,
    name: string,
    phone: string,
    email: string,
    password: string
}