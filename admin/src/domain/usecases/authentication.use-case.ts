export type AuthenticationInput = {
    email: string,
    password: string
}

export type AuthenticationOutput = {
    user: AuthenticationInput,
    token: string
}

export interface AuthenticationUseCase {
    auth(data: AuthenticationInput): Promise<AuthenticationOutput>
}