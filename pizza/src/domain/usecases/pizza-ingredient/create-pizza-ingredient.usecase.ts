export interface CreatePizzaIngredientUseCase {
    create(data: CreatePizzaIngredientInput, schema: any): Promise<CreatePizzaIngredientOutput>
}

export type CreatePizzaIngredientInput = {
    pizza_id: number,
    ingredient_id: number
}

export type CreatePizzaIngredientOutput = {
    id: number,
    pizza_id: number,
    ingredient_id: number
}