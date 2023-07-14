export interface UpdateAdminUseCase {
    update(admin: UpdateAdminInput, id: number, schema: any): Promise<UpdateAdminOutput>
}

export type UpdateAdminInput = {
    email: string,
    password: string
}

export type UpdateAdminOutput = {
    id: number,
    email: string,
    password: string
}