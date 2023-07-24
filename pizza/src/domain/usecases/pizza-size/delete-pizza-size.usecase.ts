export interface DeletePizzaSizeUseCase {
    delete(data: DeletePizzaSizeInput, schema: any): Promise<DeletePizzaSizeOutput>
}

export type DeletePizzaSizeInput = {
    pizza_id: number,
    size_id: number
}

export type DeletePizzaSizeOutput = boolean