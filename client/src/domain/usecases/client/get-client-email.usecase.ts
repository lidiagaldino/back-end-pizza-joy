export interface GetClientByEmailUseCase {
    find(client: GetClientByEmailInput): Promise<GetClientByEmailOutput>
}

export type GetClientByEmailInput = {
    email: string,
}

export type GetClientByEmailOutput = {
    id: number,
    name: string,
    phone: string,
    email: string,
    password: string
}