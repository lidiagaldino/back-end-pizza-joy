export type AdminDataInput = number

export type AdminDataOutput = {
    id: number,
    email: string
}

export interface AdminDataUseCase {
    getById(id: AdminDataInput): Promise<AdminDataOutput>
}