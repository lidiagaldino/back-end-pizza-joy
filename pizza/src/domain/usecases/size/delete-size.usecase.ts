export interface DeleteSizeUseCase {
    delete(id: DeleteSizeInput): Promise<DeleteSizeOutput>
}

export type DeleteSizeInput = number
export type DeleteSizeOutput = boolean