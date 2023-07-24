import { SizeProps } from "../../entities/size.entity"

export interface CreateSizeUseCase {
    create(size: CreateSizeInput, schema: any): Promise<CreateSizeOutput>
}

export type CreateSizeInput = Omit<SizeProps, 'id'>
export type CreateSizeOutput = SizeProps