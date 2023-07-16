export interface LoginClientUseCase {
    login(client: LoginClientInput, schema: any): Promise<LoginClientOutput>
}

export type LoginClientInput = {
    email: string,
    password: string
}

export type LoginClientOutput = {
    user: {
        id: number,
        name: string,
        phone: string,
        email: string,
        password: string
    },
    token: string
}