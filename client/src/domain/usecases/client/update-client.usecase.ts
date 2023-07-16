export interface UpdateClientUseCase {
    update(client: UpdateClientInput, id: number, schema: any): Promise<UpdateClientOutput>
}

export type UpdateClientInput = {
    name: string,
    phone: string,
    email: string,
    password: string
}

export type UpdateClientOutput = {
    id: number,
    name: string,
    phone: string,
    email: string,
    password: string
}