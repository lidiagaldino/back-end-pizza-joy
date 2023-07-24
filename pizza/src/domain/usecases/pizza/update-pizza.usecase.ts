export interface UpdatePizzaUseCase {
    update(pizza: UpdatePizzaInput, id: number, schema: any): Promise<UpdatePizzaOutput>

    verifyIfCategoryExists(category: CreatePizzaCategoryInput): Promise<CreatePizzaCategoryOutput>
}

export type UpdatePizzaInput = {
    name: string,
    photo: string,
    description: string,
    category: CreatePizzaCategoryInput
}

export type UpdatePizzaOutput = {
    id: number,
    photo: string,
    name: string
    description: string,
    category: CreatePizzaCategoryInput
}

export type CreatePizzaCategoryInput = { category_id: number }
export type CreatePizzaCategoryOutput = { category_id: number, name: string }