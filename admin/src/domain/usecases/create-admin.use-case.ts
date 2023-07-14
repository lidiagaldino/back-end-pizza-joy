export interface CreateAdminUseCase {
    create(admin: CreateAdminInput, schema: any): Promise<CreateAdminOutput>
}

export type CreateAdminInput = {
    email: string,
    password: string
}

export type CreateAdminOutput = {
    id: number,
    email: string,
    password: string
}