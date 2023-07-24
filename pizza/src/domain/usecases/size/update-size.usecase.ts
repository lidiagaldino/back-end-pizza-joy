import { SizeProps } from "../../entities/size.entity"

export interface UpdateSizeUseCase {
    update(size: UpdateSizeInput, id: number, schema: any): Promise<UpdateSizeOutput>

    updatePizzaPrices(diferency: number, size: number): Promise<boolean>
}

export type UpdateSizeInput = Omit<SizeProps, 'id'>
export type UpdateSizeOutput = SizeProps