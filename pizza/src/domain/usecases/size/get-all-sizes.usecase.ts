import { SizeProps } from "../../entities/size.entity"

export interface GetAllSizesUseCase {
    index(): Promise<GetAllSizesOutput>
}

export type GetAllSizesOutput = SizeProps[]