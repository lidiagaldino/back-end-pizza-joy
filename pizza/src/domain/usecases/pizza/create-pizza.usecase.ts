export interface CreatePizzaUseCase {
    create(pizza: CreatePizzaInput, schema: any): Promise<CreatePizzaOutput>

    verifyIfIngredientExists(ingredient: CreatePizzaIngredientInput): Promise<CreatePizzaIngredientOutput>
    verifyIfSizeExists(size: CreatePizzaSizeInput): Promise<CreatePizzaSizeOutput>
    verifyIfCategoryExists(category: CreatePizzaCategoryInput): Promise<CreatePizzaCategoryOutput>
}

export type CreatePizzaInput = {
    name: string,
    photo: string,
    description: string,
    ingredient: CreatePizzaIngredientInput,
    size: CreatePizzaSizeInput,
    category: CreatePizzaCategoryInput
}

export type CreatePizzaOutput = {
    id: number,
    name: string,
    photo: string,
    description: string,
    ingredient: CreatePizzaIngredientOutput,
    size: CreatePizzaSizeOutput,
    category: CreatePizzaCategoryOutput
}

export type CreatePizzaIngredientInput = { ingredient_id: number }[]
export type CreatePizzaIngredientOutput = { ingredient_id: number, name: string, price?: number }[]

export type CreatePizzaSizeInput = { size_id: number }[]
export type CreatePizzaSizeOutput = { size_id: number, name: string, price: number }[]

export type CreatePizzaCategoryInput = { category_id: number }
export type CreatePizzaCategoryOutput = { category_id: number, name: string }