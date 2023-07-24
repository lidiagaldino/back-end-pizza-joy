export interface DeletePizzaUseCase {
    delete(id: DeletePizzaInput): Promise<DeletePizzaOutput>
}

export type DeletePizzaInput = number
export type DeletePizzaOutput = boolean