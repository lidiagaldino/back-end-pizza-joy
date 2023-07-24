export interface DeleteIngredientUseCase {
    delete(id: number): Promise<boolean>
}