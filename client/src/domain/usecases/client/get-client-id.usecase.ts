export interface GetClientByIdUseCase {
    find(client: GetClientByIdInput): Promise<GetClientByIdOutput>
}

export type GetClientByIdInput = {
    id: number,
}

export type GetClientByIdOutput = {
    id: number,
    name: string,
    phone: string,
    email: string,
    password: string
}