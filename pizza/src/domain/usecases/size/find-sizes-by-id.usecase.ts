import { SizeProps } from "../../entities/size.entity"

export interface GetSizesByIdUseCase {
    show(id: GetSizesByIdInput): Promise<GetSizesByIdOutput>
}

export type GetSizesByIdInput = number
export type GetSizesByIdOutput = SizeProps