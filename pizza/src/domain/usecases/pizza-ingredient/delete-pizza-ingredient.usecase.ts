export interface DeletePizzaIngredientUseCase {
    delete(data: DeletePizzaIngredientInput, schema: any): Promise<DeletePizzaIngredientOutput>
}

export type DeletePizzaIngredientInput = {
    pizza_id: number,
    ingredient_id: number
}

export type DeletePizzaIngredientOutput = boolean