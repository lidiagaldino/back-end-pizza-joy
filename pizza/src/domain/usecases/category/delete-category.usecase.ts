export interface DeleteCategoryUseCase {
    delete(id: DeleteCategoryInput): Promise<DeleteCategoryOutput>
}

export type DeleteCategoryInput = number
export type DeleteCategoryOutput = boolean