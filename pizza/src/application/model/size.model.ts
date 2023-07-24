import { CreateSizeInput, CreateSizeOutput } from "../../domain/usecases/size/create-size.usecase"
import { GetAllSizesOutput } from "../../domain/usecases/size/get-all-sizes.usecase"
import { UpdateSizeInput, UpdateSizeOutput } from "../../domain/usecases/size/update-size.usecase"

export type FindByIdInput = number
export type FindByIdOutput = { id: number, name: string, price: number }

export type CreateInput = CreateSizeInput
export type CreateOutput = CreateSizeOutput

export type UpdateInput = UpdateSizeInput
export type UpdateOutput = UpdateSizeOutput

export type GetAllOutput = GetAllSizesOutput

export type DeleteInput = number
export type DeleteOutput = boolean